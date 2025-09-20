import axios from "axios";
import { INVERTEXTO_TOKEN, INVERTEXTO_URL } from "../../config";

export async function validarCpf(cpf: string): Promise<void> {
    try {
        const response = await axios.get(INVERTEXTO_URL, {
            params: {
                token: INVERTEXTO_TOKEN,
                value: cpf
            }
        });

        const isValid = response.data.valid;

        if (!isValid) {
            throw new Error("CPF inválido");
        }
    } catch (error) {
        throw new Error("Erro na validação do CPF");
    }
}