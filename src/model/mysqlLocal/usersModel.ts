import { pool } from './pool';
import { userRoleEnum } from '../../types/enums';

class UsersModel {

    public async get(user_id: number): Promise<{ id: number, login: string, password: string, name: string, role: userRoleEnum }> {
        let result = await pool.promise().query('select * from users where id=? limit 1', [user_id]);
        return result[0][0];
    }

    public async getByLogin(login: string): Promise<{ id: number, login: string, password: string, name: string, role: userRoleEnum }> {
        let result = await pool.promise().query('select * from users where login=? limit 1', [login]);
        return result[0][0];
    }

    public async all(): Promise<{ id: number, login: string, name: string, role: userRoleEnum }[]> {
        let result = await pool.promise().query('select id, login,name,role from users');
        return result[0] as { id: number, login: string, name: string, role: userRoleEnum }[];
    }

    public async insert({ login, password, name, role }: { login: string, password: string, name: string, role?: userRoleEnum }): Promise<number> {
        let query = `INSERT INTO users (login, password, name, role) VALUES (?,?,?,?);`;
        let insert = await pool.promise().query(query, [login, password, name, role]);
        return (insert[0] as any).insertId;
    }

    public async update({ id, login, password, name, role }: { id: number, login?: string, password?: string, name?: string, role?: userRoleEnum }) {
        let query = 'UPDATE users SET login=?, password=?, name=?, role=? where id=?';
        await pool.promise().query(query, [login, password, name, role, id]);
    }

    public async delete(id: number) {
        let query = 'DELETE FROM users WHERE id=?';
        await pool.promise().query(query, [id]);
    }
}

export { UsersModel }