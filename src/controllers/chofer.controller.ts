import { Controller, Get, Post, Put, Delete, Body } from "@nestjs/common";
import { Chofer } from "src/models/chofer.entity";
import { Bus } from "src/models/bus.entity";
import { ChoferService } from "src/services/chofer.service";
import { ResponsePayload } from "src/types/payloads";

@Controller('api/choferes')
export class ChoferController{
    constructor(
        private readonly service: ChoferService
    ){}

    @Get()
    async FindAll(): Promise<ResponsePayload>{
        try{
            return{
                data: await this.service.FindAll(),
                error: false,
                message: "Choferes"
            }
        }catch(error: any){
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Post('rut')
    async FindByRut(@Body() chofer: Partial<Chofer>): Promise<ResponsePayload>{
        try{
            return {
                data: await this.service.FindOneByRut(chofer.rut),
                error: false,
                message: "Chofer encontrado!"
            }
        }catch(error: any){
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Post('patente')
    async FindByPatente(@Body() bus: Partial<Bus>): Promise<ResponsePayload>{
        try{
            return {
                data: await this.service.FindOneByPatente(bus.patente),
                error: false,
                message: "Bus encontrado!"
            }
        }catch(error: any){
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Put('update')
    async UpdateChofer(@Body() chofer: Partial<Chofer>): Promise<ResponsePayload>{
        try{
            return this.service.UpdateChofer(chofer)
        }catch(error: any){
            return {
                message: error.message,
                error: true
            }
        }
    }

    @Put('update-location')
    async UpdateChoferLocation(@Body() chofer: Partial<Chofer>): Promise<void>{
        try{
	    console.log(chofer)
            await this.service.UpdateChoferLocation(chofer)
        }catch(error: any){
            console.log(error)
        }
    }

    @Put('check-rut')
    async CheckRut(@Body() chofer: Partial<Chofer>): Promise<boolean>{
        try{
            return await this.service.CheckRut(chofer.rut)
        }catch{
            return false
        }
    }

    @Delete('delete')
    async DeleteChofer(@Body() chofer: Partial<Chofer>): Promise<ResponsePayload>{
        try{
            return await this.service.DeleteChofer(chofer)
        }catch(error: any){
            return{
                message: error.message,
                error: true
            }
        }
    }
}
