import "reflect-metadata";
import { DataSource } from "typeorm";
import { Clientes } from "../../entity/cliente.entity";
import { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } from "../../config";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: false,
    logging: false,
    entities: [Clientes],
});
