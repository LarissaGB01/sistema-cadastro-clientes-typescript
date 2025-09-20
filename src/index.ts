import express from "express";
import { AppDataSource } from "./infrastructure/database/data-source";
import clienteRoutesV1 from "./routes/cliente.routes.v1";
import clienteRoutesV2 from "./routes/cliente.routes.v2";
import clienteRoutesV3 from "./routes/cliente.routes.v3";
import clienteRoutesV4 from "./routes/cliente.routes.v4";
import { connectRabbitMQ } from "./infrastructure/messaging/rabbitmq";

AppDataSource.initialize()
    .then(async () => {
        await connectRabbitMQ();
        
        const app = express();
        app.use(express.json());

        app.use("/v1/clientes", clienteRoutesV1);
        app.use("/v2/clientes", clienteRoutesV2);
        app.use("/v3/clientes", clienteRoutesV3);
        app.use("/v4/clientes", clienteRoutesV4);

        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    })
    .catch((err) => console.error("Erro na inicialização do banco", err));
