import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { geolocation } from "src/types/geolocation";
import { Bus } from "./bus.entity";

@Entity()
export class Chofer{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    @Column()
    rut: string
    @Column()
    numero: string
    @OneToOne(() => Bus, bus => bus.id)
    @JoinColumn({name: 'bus_id'})
    bus: Bus
    @Column()
    bus_id: number
    @Column({type: 'json', nullable: true})
    ubicacion: geolocation
}