import { Request } from 'express';
import { userRoleEnum } from '../../types/enums';
import { Users } from '../users/users';
import { Hash } from '../../services/hash/hash';

class Login {

    public static emptyLogin = () => {
        return {
            isLogin: false,
            login: '',
            name: '',
            role: userRoleEnum.USER
        }
    }

    public static async login({ req, login, password }) {
        try {
            if (!login || !password) throw Login.getAuthError();
            let user = await Login.getUser(login);
            let isValid = await Login.isCredentialValid({ password: password, hash: user.password });

            if (isValid) {
                Login.storeUserInSession({ req, user });
                return user;
            }
            else throw Login.getAuthError();
        } catch (error) {
            console.log(error.message);
            throw Login.getAuthError();
        }
    }

    private static async getUser(login: string) {
        let users = new Users();
        let user = await users.get({ login });

        return user;
    }

    private static async isCredentialValid({ password, hash }: { password: string, hash: string }) {
        const verify = await Hash.verify({ password, hash });
        return verify;
    }

    private static getAuthError() {
        return new Error('authentication fail');
    }

    private static storeUserInSession({ req, user }: {
        req: Request, user: {
            id: number;
            login: string;
            password: string;
            name: string;
            role: userRoleEnum;
        }
    }) {
        req.session!.login = {
            isLogin: true, login: user.login, name: user.name, role: user.role
        };
    }

}

export { Login }