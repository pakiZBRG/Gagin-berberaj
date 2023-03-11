import { check } from 'express-validator'

export const validRegister = [
  check('username').isLength({ min: 4 }).withMessage('Username must contain at least 4 characters'),
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters'),
]

export const validEmail = [
  check('email').isEmail().withMessage('Must be a valid email address')
]