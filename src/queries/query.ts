import { Pool } from "mysql2";

export class Query {
    pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }

    getQuery(): undefined | string {
        return undefined;
    }

    escape(str: any) {
        //@ts-ignore
        return this.pool.escape(str);
    }

    run() {
        const query = this.getQuery();
        if(!query) return;
        return this.pool.query(`${query};`);
    }
}