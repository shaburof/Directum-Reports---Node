import { pool } from './pool';
import { fotoType } from '../../types/types';

class FotoModel {


    public async findByFio(fio: string): Promise<fotoType> {
        // let result = await pool.promise().query('select ename from personlist where fio=? limit 1', [fio]);
        let result = await pool.promise().query('select ename from login where name=? limit 1', [fio]);
        let normalize = result[0][0] ? this.normalizeString(result[0][0].ename) : '';

        return { ename: normalize };
    }

    private normalizeString(str: string) {
        return str.toLowerCase();
    }

    public async status() {
        let result = await pool.promise().query('select * from personlist limit 1');
        return result[0];
    }

}

export { FotoModel };