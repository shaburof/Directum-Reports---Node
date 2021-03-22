import { pool } from './pool';
import { considerationDayEnum } from '../../types/enums';

class ClassifierModel {

    public async get({ id, typeNumber }: { id?: string, typeNumber?: string }): Promise<{ id: number, title: string, typeNumber: string, considerationTime: number, considerationDayType: string }> {
        let query = '';
        let prop = '';
        if (id) {
            query = 'select * from classifier where id=? limit 1';
            prop = id;
        }
        else if (typeNumber) {
            query = 'select * from classifier where typeNumber=? limit 1'
            prop = typeNumber;
        }
        else throw new Error('ClassifierModel.get({ id?: string,typeNumber?:string}) id и typeNumber не могут быть указаны вместе')
        let result = await pool.promise().query(query, [prop]);

        return result[0][0];
    }

    public async all() {
        let result = await pool.promise().query('SELECT * FROM classifier order by typeNumber');
        return result[0];
    }

    public async insert({ typeNumber, title, considerationTime, considerationDayType }: { typeNumber: string, title: string, considerationTime: number, considerationDayType: considerationDayEnum }) {
        let query = 'INSERT INTO classifier (typeNumber, title, considerationTime, considerationDayType) VALUES (?,?,?,?)';
        let result = await pool.promise().query(query, [typeNumber, title, considerationTime, considerationDayType]);
        let insertId = (result[0] as any).insertId;

        return insertId;
    }


    public async update({ id, title, considerationTime, considerationDayType }: { id: string, title: string, considerationTime: number, considerationDayType: considerationDayEnum }) {
        let classifier = await this.get({ id });
        if (!classifier) throw new Error(`Классификатор id:${id} не найден`);

        classifier = { ...classifier, title, considerationTime, considerationDayType };

        let query = 'UPDATE classifier SET title=?, considerationTime=?, considerationDayType=? where id=?';
        let result = await pool.promise().query(query, [classifier.title, classifier.considerationTime, classifier.considerationDayType, id]);
    }

    public async delete(id: number) {
        let query = 'DELETE FROM classifier WHERE id=?';
        await pool.promise().query(query, [id]);
    }

}

export { ClassifierModel };