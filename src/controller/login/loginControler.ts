import { Request, Response, NextFunction } from 'express';
import { Login } from '../../services/login/login';

class LoginController {
    public static login = async (req: Request, res: Response, next: NextFunction) => {
        if (res.locals.isLogin) return res.status(404).json({ status: false, message: 'already authorized' });
        let { login, password } = req.body;

        try {
            let user = await Login.login({ req, login, password });
            user.password = '';
            return LoginController.sendResult({ res, data: user });
        } catch (error) {
            return res.status(404).json({ status: false, message: error.message })
        }
    }

    public static isLogin = (req: Request, res: Response, next: NextFunction) => {
        let session = req.session;
        if (session!.login && session!.login.isLogin === true) return res.status(200).json({ status: true, data: session!.login });
        else return res.status(200).json({ status: true, data: session!.login });
    }

    public static logout = (req: Request, res: Response, next: NextFunction) => {
        req.session!.login = Login.emptyLogin();
        res.status(200).json({ status: true, data: '' });
    }

    private static sendResult = ({ res, data }: { res: Response, data?: any }) => {
        return res.status(200).json({ status: true, data });
    }
}

export { LoginController }