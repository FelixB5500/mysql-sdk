import { Database } from "../database";
import { Query } from "./query";

export type InsertMap = {
    key: string;
    value: string;
}[];

export class Insert extends Query {
    private query: string;
    constructor(db: Database, table: string, first: string[] | string | InsertMap, second?: string | string[]) {
        super(db.pool);
        this.query = `INSERT INTO ${table} `;
        let keys: undefined | string[] = undefined;
        if(Array.isArray(first) && typeof first[0] == "object") {
            keys = [];
            second = [];
            for(const entry of first as InsertMap) {
                keys.push(entry.key)
                second.push(db.escape(entry.value));
            }
        }
        this.query += `(${keys ?? first}) VALUES (${second}) `;
        console.log(this.query);
    }

    where(key: string, comparison: string, value: string) {
        this.query += `WHERE ${key} ${comparison} ${this.escape(value)}`;
        return this;
    }

    getQuery(): string {
        return this.query;
    }
}