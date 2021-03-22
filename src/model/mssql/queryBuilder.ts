import sql from 'mssql';
import { requests } from './requests';

class QueryBuilder {
    private dateFrom: string;
    private dateTo: string;
    private query: any;
    private request: string;
    private pool: any;
    private filter: { type: string, values: string[] };
    private filterTypes = {
        responsible: 'responsible'
    }

    constructor({ pool, filter, dateFrom, dateTo }: { pool: any, filter: { type: string, values: string[] }, dateFrom: string, dateTo: string }) {
        this.pool = pool;
        this.filter = filter;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    public create(): { query: any, request: string } {
        let filterType = this.filter.type;
        let method = this.filterTypes[filterType];

        if (!method) return this.all();
        else return this[method]();

    }

    private createQuery() {
        this.query = this.pool.request()
            .input('dateFrom', sql.VarChar(50), this.dateFrom)
            .input('dateTo', sql.VarChar(50), this.dateTo);
    }

    private all() {
        this.request = requests.getAppealsOnPeriod();
        this.createQuery();

        return this.results();
    }

    private responsible() {
        this.request = requests.getAppealsWithPersonsFilter(this.filter.values);
        this.createQuery();

        this.filter.values.map((value, index) => {
            this.query.input(`p${index}`, sql.NVarChar, value);
        });

        return this.results();
    }

    private results() {
        return { request: this.request, query: this.query };
    }
}


export { QueryBuilder }