import { validateRequest } from './validation.js';
import * as userService from './userService.js';

export const signup = async (req, res) => {
  try {
    validateRequest(req, res, async () => {
      const { user, token } = await userService.createUser(req.body);
      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        },
        token
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await userService.authenticateUser(username, password);
    
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    validateRequest(req, res, async () => {
      const updatedUser = await userService.updateUserDetails(req.user.id, req.body);
      res.json({
        message: 'User updated successfully',
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          role: updatedUser.role
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};