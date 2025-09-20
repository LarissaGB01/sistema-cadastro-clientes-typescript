import { Clientes } from "../../entity/cliente.entity";
import { AppDataSource } from "../database/data-source";

export async function persistirCliente({ cpf, nome }: { cpf: string; nome: string }): Promise<Clientes> {
    const repo = AppDataSource.getRepository(Clientes);
    
    const existing = await repo.findOneBy({ cpf });
    if (existing) {
        throw new Error("CPF já cadastrado");
    }

    const cliente = repo.create({ cpf, nome, sistema: "TYPESCRIPT" });
    await repo.save(cliente);
    return cliente;
}