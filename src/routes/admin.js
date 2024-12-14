import express from 'express';
import { body } from 'express-validator';
import { getAllLawyers, updateLawyer, getAllUsers, updateUser } from '../controllers/admin/adminController.js';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../controllers/admin/validation.js';

const router = express.Router();

router.get('/lawyers', auth(['admin']), getAllLawyers);

router.put('/lawyers/:id', [
  auth(['admin']),
  body('name').optional().isString().trim().notEmpty(),
  body('specialty').optional().isString().trim().notEmpty(),
  body('experience_years').optional().isInt({ min: 0 }),
  body('email').optional().isEmail(),
  validateRequest
], updateLawyer);

router.get('/users', auth(['admin']), getAllUsers);

router.put('/users/:id', [
  auth(['admin']),
  body('username').optional().isString().trim().notEmpty(),
  validateRequest
], updateUser);

export default router;