import express from 'express';
import { ClassifierController } from '../controller/classifier/classifierController';

const router = express.Router();

router.get('/classifier', ClassifierController.all);
router.delete('/classifier/:id', ClassifierController.delete);
router.put('/classifier/:id', ClassifierController.update);
router.post('/classifier', ClassifierController.insert);

export default router;