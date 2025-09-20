import { Router, Request, Response } from "express";
import { persistirCliente } from "../infrastructure/services/persistir-cliente";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
    console.log("Requisição recebida:", req.body);

    const cpf = req.body.cpf.replace(/\D/g, "");
    const nome = req.body.nome.substring(0, 30);

    const cliente = await persistirCliente({ cpf, nome });

    res.status(201).json(cliente);
});

export default router;
