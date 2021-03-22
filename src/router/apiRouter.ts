import express from 'express';
import { AppealsController } from '../controller/appeals/appealsController';
import { ClassifierController } from '../controller/classifier/classifierController';
import { UserController } from '../controller/user/userController';

const router = express.Router();

router.get('/test', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.session);
    res.status(200).json({ status: 'test get: ok', data: req.session!.login });
});


router.post('/get', AppealsController.post);

router.get('/classifier/:id', ClassifierController.get);
router.get('/classifier/', ClassifierController.all);
router.post('/classifier', ClassifierController.insert);
router.put('/classifier/:id', ClassifierController.update);
router.delete('/classifier/:id', ClassifierController.delete);

router.get('/user/:id', UserController.get);
router.get('/user', UserController.all);
router.post('/user', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);


export default router;