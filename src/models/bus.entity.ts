import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Chofer } from "./chofer.entity";

@Entity()
export class Bus{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    patente: string
    @OneToOne(() => Chofer, chofer => chofer.bus)
    chofer: Chofer
}
