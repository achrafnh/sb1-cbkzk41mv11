import express from 'express';
import { body } from 'express-validator';
import { signup, login, updateUser } from '../controllers/user/userController.js';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../controllers/user/validation.js';

const router = express.Router();

router.post('/signup', [
  body('username').isString().trim().notEmpty(),
  body('password').isLength({ min: 6 }),
  validateRequest
], signup);

router.post('/login', [
  body('username').isString().trim().notEmpty(),
  body('password').isString().notEmpty(),
  validateRequest
], login);

router.put('/update', [
  auth(['user']),
  body('username').optional().isString().trim().notEmpty(),
  validateRequest
], updateUser);

export default router;