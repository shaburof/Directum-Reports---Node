import { Request, Response, NextFunction } from 'express';
import { Users } from '../../services/users/users';
import { userRoleEnum } from '../../types/enums';

const users = new Users();

class UserController {

    public static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            let user = await users.get({ user_id: id });
            return res.json({ status: true, data: user });
        } catch (error) {
            console.log('userController: ', error.message);
            return next(UserController.getError());
        }
    }

    public static async all(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            let allUsers = await users.all();
            return res.json({ status: true, data: allUsers });
        } catch (error) {
            console.log('userController: ', error.message);
            return next(UserController.getError());
        }
    }

    public static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, name, password, role } = req.body;
            let user_id = await users.create({ login, name, password, role });
            return res.json({ status: true, data: user_id });
        } catch (error) {
            console.log('userController: ', error.message);
            return next(UserController.getError());
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            const { login, name, password, role } = req.body;
            await users.update({ id, login, name, password, role });

            return res.json({ status: true });
        } catch (error) {
            console.log('userController: ', error.message);
            return next(UserController.getError());
        }
    }
    public static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            await users.delete(id);

            return res.json({ status: true });
        } catch (error) {
            console.log('userController: ', error.message);
            return next(UserController.getError());
        }
    }

    private static getError() {
        return new Error('user handler fail');
    }
}

export { UserController }