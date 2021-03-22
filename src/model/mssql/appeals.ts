import sql from 'mssql';
import { appealType } from '../../types/types';
import { pool } from './pool';
import { requests } from './requests';
import { Validate } from '../../services/validate/validate';
import { QueryBuilder } from './queryBuilder';

class Appeals {

    private pool: any;
    private dateFrom: string = '';
    private dateTo: string = '';
    private requestToDb: string = '';
    private request: Function;
    private _filter: { type: string, values: string[] } = {
        type: '',
        values: []
    }

    constructor() {
        this.pool = pool;

    }

    public setDataPeriod({ dateFrom, dateTo }: { dateFrom: string, dateTo: string }) {
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;

        return this;
    }

    public filter(filter: { type: string, values: string[] }) {
        if (!filter) return this;

        this._filter.type = filter.type;
        this._filter.values = filter.values;
        return this;
    }

    public async go(): Promise<appealType[]> {
        // this.buildQuery();
        this.isValid();

        let pool = await this.pool();
        let { query, request } = this.createQuery(pool)

        let result = await query.query(request);
        // let result = await this.request(pool);
        // let result = await pool.request()
        //     .input('dateFrom', sql.VarChar(50), this.dateFrom)
        //     .input('dateTo', sql.VarChar(50), this.dateTo)
        //     .query(this.requestToDb);

        this.finish(pool);
        return this.extractData(result);
    }

    private createQuery(pool: any) {
        let queryBuilder = new QueryBuilder({ pool, filter: this._filter, dateFrom: this.dateFrom, dateTo: this.dateTo });
        return queryBuilder.create();
    }

    private isValid() {
        if (!Validate.isValidDate(this.dateFrom) || !Validate.isValidDate(this.dateTo)) throw new Error('dateFrom и dateTo указаны некорректно');
        // else if (this.requestToDb.trim() === '') throw new Error('тип запроса не указан');
    }

    private extractData(data: { recordsets: [], recordset: [] }) {
        return data.recordset
    }

    private close(pool: any) {
        pool.close();
    }

    private finish(pool: any) {
        this.dateFrom = '';
        this.dateTo = '';
        this.requestToDb = '';
        this._filter = { type: '', values: [] };
        this.close(pool);
    }
}

export { Appeals }