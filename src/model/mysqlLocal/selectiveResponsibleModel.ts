import { pool } from './pool';

class SelectiveResponsibleModel {

    public async get(user_id: number): Promise<string[]> {
        let result = await pool.promise().query('select fio from selective_responsible where user_id=?', [user_id]);
        return this.objectToArray(result[0] as { fio: string }[]);
    }

    public async insert({ user_id, fio }: { user_id: number, fio: string }) {
        let isExists = await this.getByFio({ fio, user_id });
        if (isExists !== undefined) return;

        let query = `INSERT INTO selective_responsible (fio,user_id) VALUES (?,?);`;
        await pool.promise().query(query, [fio, user_id]);
    }

    public async delete({ user_id, fio }: { user_id: number, fio: string }) {
        let query = 'DELETE FROM selective_responsible WHERE fio=? and user_id=?';
        await pool.promise().query(query, [fio, user_id]);
    }

    private async getByFio({ fio, user_id }: { fio: string, user_id: number }) {
        let result = await pool.promise().query('select fio from selective_responsible where fio=? and user_id=? limit 1', [fio, user_id]);
        return result[0][0];
    }

    private objectToArray(obj: { fio: string }[]) {
        let tempArray: string[] = [];
        let data = obj;
        for (const item of data) tempArray.push(item.fio);

        return tempArray;
    }

}

export { SelectiveResponsibleModel }