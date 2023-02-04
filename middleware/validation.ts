import { check } from 'express-validator'

export const validRegister = [
    check('email', 'Email is required')
        .isEmail().withMessage('Must be a valid email address'),
    check('password', 'Password is required')
        .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters'),
    check('username', 'Username is required')
        .isLength({ min: 4 }).withMessage('Username must contain at least 4 characters'),
    check('image', 'Image is required')
]

export const validEmail = [
    check('email', 'Email is required')
    .isEmail().withMessage('Must be a valid email address')
]