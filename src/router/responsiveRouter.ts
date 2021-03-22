import express from 'express';
import { ResponsiveController } from '../controller/appeals/responsiveController';

const router = express.Router();

router.post('/responsite', ResponsiveController.add);
router.delete('/responsite', ResponsiveController.delete);

export default router;