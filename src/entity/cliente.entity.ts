import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Clientes {
    @PrimaryColumn()
    cpf!: string;

    @Column()
    nome!: string;

    @Column()
    sistema!: string;
}