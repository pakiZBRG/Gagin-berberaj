import controller from '../controllers/users'
import { Router } from 'express';
import { validRegister, validEmail } from '../middleware/validation'

const router = Router();

router.post('/register', validRegister, controller.register)

router.post('/activate', controller.activate)

// check is token valid
router.get('/activation/valid/:token', controller.activationValidToken)

router.get('/password/valid/:token', controller.passwordValidToken)

router.post('/login', controller.login)

router.post('/forgot-password', validEmail, controller.forgotPassword)

router.post('/reset-password', controller.resetPassword)

export = router;