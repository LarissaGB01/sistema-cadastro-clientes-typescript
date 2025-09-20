import { Router, Request, Response } from "express";
import { Clientes } from "../entity/cliente.entity";
import { publishToQueue } from "../infrastructure/messaging/rabbitmq";
import { validarCpf } from "../infrastructure/services/validar-cpf";
import { persistirCliente } from "../infrastructure/services/persistir-cliente";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
    const entrada: { cpf: string; nome: string }[] = req.body;
    
    const resultados = await Promise.allSettled(
        entrada.map(async ({ cpf, nome }) => {
            try {
                console.log("Requisição recebida:", req.body);

                cpf = cpf.replace(/\D/g, "");
                nome = nome.substring(0, 30);
                
                await validarCpf(cpf);
                const cliente = await persistirCliente({ cpf, nome });
                publishToQueue(cliente);

                return {
                    cpf: cliente.cpf,
                    nome: cliente.nome,
                    sistema: cliente.sistema,
                    status: "Cliente cadastrado",
                    error: null
                };

            } catch (error) {
                console.error("Erro ao processar cliente:", error);

                return {
                    cpf,
                    nome: null,
                    sistema: null,
                    status: "Erro ao cadastrar cliente",
                    error: error instanceof Error ? error.message : String(error)
                };
            }
        }));

    res.status(201).json({
        resultados: resultados.map((r) =>
            r.status === "fulfilled" ? r.value : {
                cpf: null,
                status: "Erro ao cadastrar cliente",
                error: r.reason?.message || "Erro desconhecido"
            }
        )
});
});

export default router;
