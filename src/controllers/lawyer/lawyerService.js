import Lawyer from '../../models/Lawyer.js';
import User from '../../models/User.js';
import elasticClient from '../../config/elasticsearch.js';
import { generateToken } from './auth.js';

export const createLawyer = async (lawyerData) => {
  const user = await User.create({
    username: lawyerData.email,
    password: lawyerData.password,
    role: 'lawyer'
  });

  const lawyer = await Lawyer.create({
    name: lawyerData.name,
    specialty: lawyerData.specialty,
    experience_years: lawyerData.experience_years,
    email: lawyerData.email
  });

  const token = generateToken(user);
  return { lawyer, token };
};

export const authenticateLawyer = async (email, password) => {
  const user = await User.findOne({ 
    where: { username: email, role: 'lawyer' }
  });

  if (!user) {
    throw new Error('Lawyer not found');
  }

  const isValidPassword = await comparePasswords(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const lawyer = await Lawyer.findOne({ where: { email } });
  const token = generateToken(user);
  return { lawyer, token };
};

export const updateLawyerDetails = async (email, updateData) => {
  const lawyer = await Lawyer.findOne({ where: { email } });
  if (!lawyer) {
    throw new Error('Lawyer not found');
  }

  await lawyer.update(updateData);
  return lawyer;
};

export const searchLawyers = async (query) => {
  const searchBody = {
    query: {
      bool: {
        should: [
          { match: { name: query.term || '' } },
          { match: { specialty: query.specialty || '' } }
        ]
      }
    }
  };

  if (query.experience_years) {
    searchBody.query.bool.must = [
      { range: { experience_years: { gte: query.experience_years } } }
    ];
  }

  const result = await elasticClient.search({
    index: 'lawyers',
    body: searchBody
  });

  return result.hits.hits.map(hit => hit._source);
};