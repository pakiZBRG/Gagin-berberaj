import { Router } from 'express';

import controller from '../controllers/workingTime'

const router = Router();

router.post('/working-time', controller.create)
router.get('/working-time', controller.getWorkingTime)
router.put('/working-time/:id', controller.update)
router.delete('/working-time/:id', controller.remove)

export = router;