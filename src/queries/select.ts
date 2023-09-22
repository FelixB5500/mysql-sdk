import { Database } from "../database";
import { Query } from "./query";

export class Select extends Query {
    private query: string;
    constructor(db: Database, keys: string | string[]) {
        super(db.pool);
        this.query = `SELECT ${keys} `;
    }

    from(table: string) {
        this.query += `FROM ${table} `;
        return this;
    }

    where(key: string, comparison: string, value: string) {
        this.query += `WHERE ${key} ${comparison} ${this.escape(value)}`;
        return this;
    }

    getQuery(): string {
        return this.query;
    }
}