import express from 'express';
import { LoginController } from '../controller/login/loginControler';

const router = express.Router();

router.post('/login', LoginController.login);
router.post('/islogin', LoginController.isLogin);
router.get('/logout', LoginController.logout);

export default router;
