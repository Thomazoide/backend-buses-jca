import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chofer } from "src/models/chofer.entity";
import { ResponsePayload } from "src/types/payloads";

@Injectable()
export class ChoferService{
    constructor(
        @InjectRepository(Chofer)
        private readonly repositorio: Repository<Chofer>
    ){}

    async FindAll(): Promise<Chofer[]>{
        return this.repositorio.find()
    }

    async FindOneByRut(rut: string): Promise<Chofer>{
        const exists: Chofer | null = await this.repositorio.findOneBy({rut})
        if(!exists){
            throw new Error("Chofer no encontrado...")
        }
        return exists
    }

    async FindOneByPatente(patente: string): Promise<Chofer>{
        const exists: Chofer | null = await this.repositorio.findOneBy({bus: {patente}})
        if(!exists){
            throw new Error("Chofer no encontrado...")
        }
        return exists
    }

    async CreateChofer(chofer: Partial<Chofer>): Promise<Chofer>{
        const exists: Chofer | null = await this.repositorio.findOneBy({rut: chofer.rut})
        if(exists){
            throw new Error("Chofer ya existente")
        }
        return await this.repositorio.save(chofer)
    }

    async UpdateChofer(chofer: Partial<Chofer>): Promise<ResponsePayload>{
        const updateResult = await this.repositorio.update({id: chofer.id}, chofer)
        if(updateResult.affected === 0){
            throw new Error("Error al actualizar...")
        }
        return {
            error: false,
            message: "Chofer actualizado!"
        }
    }

    async UpdateChoferLocation(chofer: Partial<Chofer>): Promise<void>{
        await this.repositorio.update({rut: chofer.rut}, chofer)
    }

    async DeleteChofer(chofer: Partial<Chofer>): Promise<ResponsePayload>{
        const deleteResult = await this.repositorio.delete({id: chofer.id})
        if(deleteResult.affected === 0){
            throw new Error("Chofer no encontrado...")
        }
        return {
            error: false,
            message: "Chofer eliminado"
        }
    }

    async CheckRut(rut: string): Promise<boolean>{
        const isValid: boolean = await this.repositorio.findOneBy({rut}) ? true : false
        return isValid
    }
}