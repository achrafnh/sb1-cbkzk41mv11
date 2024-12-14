import express from 'express';
import { body } from 'express-validator';
import { signup, login, updateLawyer, searchLawyers } from '../controllers/lawyer/lawyerController.js';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../controllers/lawyer/validation.js';

const router = express.Router();

router.post('/signup', [
  body('name').isString().trim().notEmpty(),
  body('specialty').isString().trim().notEmpty(),
  body('experience_years').isInt({ min: 0 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  validateRequest
], signup);

router.post('/login', [
  body('email').isEmail(),
  body('password').isString().notEmpty(),
  validateRequest
], login);

router.put('/update', [
  auth(['lawyer']),
  body('name').optional().isString().trim().notEmpty(),
  body('specialty').optional().isString().trim().notEmpty(),
  body('experience_years').optional().isInt({ min: 0 }),
  validateRequest
], updateLawyer);

router.get('/search', searchLawyers);

export default router;