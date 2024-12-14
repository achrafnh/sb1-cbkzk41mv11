import { validateRequest } from './validation.js';
import * as lawyerService from './lawyerService.js';

export const signup = async (req, res) => {
  try {
    validateRequest(req, res, async () => {
      const { lawyer, token } = await lawyerService.createLawyer(req.body);
      res.status(201).json({
        message: 'Lawyer account created successfully',
        lawyer: {
          id: lawyer.id,
          name: lawyer.name,
          specialty: lawyer.specialty,
          experience_years: lawyer.experience_years,
          email: lawyer.email
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
    const { email, password } = req.body;
    const { lawyer, token } = await lawyerService.authenticateLawyer(email, password);
    
    res.json({
      message: 'Login successful',
      lawyer: {
        id: lawyer.id,
        name: lawyer.name,
        specialty: lawyer.specialty,
        experience_years: lawyer.experience_years,
        email: lawyer.email
      },
      token
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const updateLawyer = async (req, res) => {
  try {
    validateRequest(req, res, async () => {
      const updatedLawyer = await lawyerService.updateLawyerDetails(req.user.username, req.body);
      res.json({
        message: 'Lawyer details updated successfully',
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

export const searchLawyers = async (req, res) => {
  try {
    const lawyers = await lawyerService.searchLawyers(req.query);
    res.json({
      message: 'Lawyers found',
      lawyers
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};