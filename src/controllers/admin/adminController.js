import { validateRequest } from './validation.js';
import * as adminService from './adminService.js';

export const getAllLawyers = async (req, res) => {
  try {
    const lawyers = await adminService.getAllLawyers();
    res.json({
      message: 'Lawyers retrieved successfully',
      lawyers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLawyer = async (req, res) => {
  try {
    validateRequest(req, res, async () => {
      const { id } = req.params;
      const updatedLawyer = await adminService.updateLawyerById(id, req.body);
      res.json({
        message: 'Lawyer updated successfully',
        lawyer: {
          id: updatedLawyer.id,
          name: updatedLawyer.name,
          specialty: updatedLawyer.specialty,
          experience_years: updatedLawyer.experience_years,
          email: updatedLawyer.email
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json({
      message: 'Users retrieved successfully',
      users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    validateRequest(req, res, async () => {
      const { id } = req.params;
      const updatedUser = await adminService.updateUserById(id, req.body);
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