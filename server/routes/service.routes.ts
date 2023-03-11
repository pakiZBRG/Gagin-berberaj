import { Router } from 'express';

import controller from '../controllers/services'

const router = Router();

router.post('/service', controller.create)
router.get('/service', controller.getServices)
router.put('/service/:id', controller.update)
router.delete('/service/:id', controller.remove)

export = router;