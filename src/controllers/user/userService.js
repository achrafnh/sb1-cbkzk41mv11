import User from '../../models/User.js';
import { comparePasswords, generateToken } from './auth.js';

export const createUser = async (userData) => {
  const user = await User.create(userData);
  const token = generateToken(user);
  return { user, token };
};

export const authenticateUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await comparePasswords(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const token = generateToken(user);
  return { user, token };
};

export const updateUserDetails = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  await user.update(updateData);
  return user;
};