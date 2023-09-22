import { createPool, Pool, PoolOptions } from "mysql2";
import { Database } from "./database";

export interface DatabaseManager {
    databases: Map<string, Database>;
}

export class DatabaseManager {
    constructor() {
        this.databases = new Map();
    }

    connect(name: string, connectionUri: string): Database | undefined;
    connect(name: string, config: PoolOptions): Database | undefined;

    connect(name: any, config: any): Database | undefined {
        this.databases.set(name, new Database(config));
        return this.databases.get(name);
    }
} 
