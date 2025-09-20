import { Router, Request, Response } from "express";
import { validarCpf } from "../infrastructure/services/validar-cpf";
import { persistirCliente } from "../infrastructure/services/persistir-cliente";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
    console.log("Requisição recebida:", req.body);

    const cpf = req.body.cpf.replace(/\D/g, "");
    const nome = req.body.nome.substring(0, 30);

    await validarCpf(cpf);
    const cliente = await persistirCliente({ cpf, nome });

    res.status(201).json(cliente);
});

export default router;
