import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bus } from "src/models/bus.entity";
import { ResponsePayload } from "src/types/payloads";

@Injectable()
export class BusService{
    constructor(
        @InjectRepository(Bus)
        private readonly repositorio: Repository<Bus>
    ){}

    async GetAll(): Promise<Bus[]>{
        return this.repositorio.find()
    }

    async FindByPatente(patente: string): Promise<Bus>{
        const exists: Bus | null = await this.repositorio.findOneBy({patente})
        if(!exists){
            throw new Error('Bus no existente')
        }
        return exists
    }

    async FindByChoferRut(rut: string): Promise<Bus>{
        const exists: Bus | null = await this.repositorio.findOneBy({chofer: {rut}})
        if(!exists){
            throw new Error('Bus no encontrado...')
        }
        return exists
    }

    async UpdateBus(bus: Partial<Bus>): Promise<ResponsePayload>{
        const updateResult = await this.repositorio.update({id: bus.id}, bus)
        if(updateResult.affected === 0){
            throw new Error('Bus no encontrado...')
        }
        return {
            error: false,
            message: "Bus actualizado!"
        }
    }

    async DeleteBus(bus: Partial<Bus>): Promise<ResponsePayload>{
        const deleteResult = await this.repositorio.delete({id: bus.id})
        if(deleteResult.affected === 0){
            throw new Error('Bus no encontrado...')
        }
        return{
            error: false,
            message: "Bus eliminado!"
        }
    }
}