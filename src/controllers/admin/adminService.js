import User from '../../models/User.js';
import Lawyer from '../../models/Lawyer.js';

export const getAllLawyers = async () => {
  return await Lawyer.findAll({
    attributes: ['id', 'name', 'specialty', 'experience_years', 'email']
  });
};

export const updateLawyerById = async (lawyerId, updateData) => {
  const lawyer = await Lawyer.findByPk(lawyerId);
  if (!lawyer) {
    throw new Error('Lawyer not found');
  }

  await lawyer.update(updateData);
  return lawyer;
};

export const getAllUsers = async () => {
  return await User.findAll({
    attributes: ['id', 'username', 'role'],
    where: { role: 'user' }
  });
};

export const updateUserById = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (updateData.password) {
    delete updateData.password; // Prevent password updates through admin route
  }

  await user.update(updateData);
  return user;
};