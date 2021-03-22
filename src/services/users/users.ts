import { UsersModel } from '../../model/mysqlLocal/usersModel';
import { SelectiveResponsibleModel } from '../../model/mysqlLocal/selectiveResponsibleModel';
import { userRoleEnum } from '../../types/enums';
import { Hash } from '../../services/hash/hash';

class Users {

    private userModel: UsersModel;
    private selectiveResponsibleModel: SelectiveResponsibleModel;
    private defaultResponsible = ['белкина юлия дмитриевна', 'лысова екатерина сергеевна', 'сотрудник оперу', 'сотрудник мидл', 'сотрудник helpdesk'];

    constructor() {
        this.userModel = new UsersModel();
        this.selectiveResponsibleModel = new SelectiveResponsibleModel();
    }

    public async get({ user_id, login }: { user_id?: number, login?: string }) {
        if (!user_id && !login) throw new Error('getUser({user_id,login}) поля должны быть заполнены');

        let user;
        if (user_id) user = await this.userModel.get(user_id);
        else user = await this.userModel.getByLogin(login as string);
        let responsibles = await this.selectiveResponsibleModel.get(user.id);
        user.responsibles = responsibles;

        return user;
    }

    public async all() {
        return await this.userModel.all();
    }

    public async create({ login, password, name, role }: { login: string, password: string, name: string, role: userRoleEnum }) {
        let user = { login, password, name, role };
        if (!this.isValid({ login, name, password, role })) return this.getError();

        user.password = await Hash.hash(password);

        let user_id = await this.userModel.insert(user);
        for (const fio of this.defaultResponsible) {
            this.selectiveResponsibleModel.insert({ user_id, fio });
        }
        return user_id;
    }

    public async update({ id, login, password, name, role }: { id: number, login?: string, password?: string, name?: string, role?: userRoleEnum }) {
        if (!login && !name && !role) return;
        let user = await this.userModel.get(id);
        if (!user) throw new Error(`users id:${id} не найден`);

        console.log('password: ', password);
        console.log('user.password: ', user.password);
        user.login = login as string || user.login;
        user.password = password as string || user.password;
        user.name = name as string || user.name;
        user.role = role as userRoleEnum || user.role;
        console.log('user: ', user);

        await this.userModel.update(user);
    }

    public async delete(user_id: number) {
        await this.userModel.delete(user_id);
    }

    private isValid({ login, name, password, role }: { login: string, name: string, password: string, role: userRoleEnum }) {
        if ((typeof login === 'undefined' || typeof name === 'undefined'
            || typeof password === 'undefined' || typeof role === 'undefined')) return false;
        return true;
    }

    private getError() {
        return new Error('users fail');
    }
}

export { Users }