import {createPool, OkPacket, ProcedureCallPacket, QueryError, ResultSetHeader, RowDataPacket, Pool, PoolOptions } from "mysql2";
import { Select } from "./queries/select";
import { Insert, InsertMap } from "./queries/insert";

export interface Database {
    pool: Pool;
    //escape: (str: any) => string;
};

export class Database {
    constructor(connectionUri: string);
    constructor(config: PoolOptions);

    constructor(config: any) {
        this.pool = createPool(config)
    }

    query(query = "", database = this.pool) {
        return new Promise<QueryError | OkPacket | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket>((resolve, reject) => {
            database.query(query, function(err: QueryError, result: any) {
                return err ? reject(err) : resolve(result);
            });
        });
    }

    escape(str: any) {
        //@ts-ignore
        return this.pool.escape(str);
    }

    select(keys: string | string[]) {
        return new Select(this, keys);
    }

    
    insert(table: string, map: InsertMap): Insert;
    insert(table: string, keys: string[] | string, values: string[] | string): Insert;

    insert(table: string, first: string[] | string | InsertMap, second?: string | string[]) {
        return new Insert(this, table, first, second);
    }
}