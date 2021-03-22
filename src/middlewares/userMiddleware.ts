import { Request, Response, NextFunction } from 'express';
import { Login } from '../services/login/login';
import { Users } from '../services/users/users';

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.session!.login) req.session!.login = Login.emptyLogin();
    res.locals.isLogin = req.session!.login.isLogin;
    if (res.locals.isLogin) {
        try {
            let users = new Users();
            let user = await users.get({ login: req.session!.login.login })
            res.locals.user = user;
        } catch (error) {
            req.session!.login = undefined;
        }
    }

    next();
};

export { userMiddleware };
