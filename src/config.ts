import dotenv from "dotenv";

dotenv.config();

export const DB_USER = process.env.SPRING_DATASOURCE_USERNAME!;
export const DB_PASS = process.env.SPRING_DATASOURCE_PASSWORD!;
export const DB_HOST = process.env.SPRING_DATASOURCE_HOST || "127.0.0.1";
export const DB_PORT = parseInt(process.env.SPRING_DATASOURCE_PORT || "3306");
export const DB_NAME = process.env.SPRING_DATASOURCE_DB || "tcc";

export const INVERTEXTO_TOKEN = process.env.INVERTEXTO_TOKEN!;
export const INVERTEXTO_URL = "https://api.invertexto.com/v1/validator";
