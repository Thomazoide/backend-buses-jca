import { Controller, Get, Post, Put, Delete, Body } from "@nestjs/common";
import { Bus } from "src/models/bus.entity";
import { Chofer } from "src/models/chofer.entity";
import { BusService } from "src/services/bus.service";
import { ResponsePayload } from "src/types/payloads";

@Controller('api/buses')
export class BusController{
    constructor(
        private readonly service: BusService
    ){}

    @Get()
    async FindAll(): Promise<ResponsePayload>{
        try{
            return {
                data: await this.service.GetAll(),
                error: false,
                message: "Buses"
            }
        }catch(error: any){
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Get('unassigned')
    async GetUnassigned(): Promise<ResponsePayload>{
        try{
            return {
                data: await this.service.GetUnassignedBuses(),
                message: "Buses sin asignar",
                error: false
            }
        }catch(err: any){
            return{
                message: err.message,
                error: true
            }
        }
    }

    @Post('id')
    async GetByID(@Body() bus: Partial<Bus>): Promise<ResponsePayload>{
	try{
	    return {
		data: await this.service.FindByID(bus.id),
		message: "Bus encontrado",
		error: false
	    }
	}catch(err: any){
	    return {
		message: "Bus no encontrado",
		error: true
	    }
	}
    }

    @Post('patente')
    async FindOneByPatente(@Body() bus: Partial<Bus>): Promise<ResponsePayload>{
        try{
            return {
                data: await this.service.FindByPatente(bus.patente),
                message: "Bus encontrado",
                error: false
            }
        }catch(error: any){
            return{
                message: error.message,
                error: true
            }
        }
    }

    @Post('rut')
    async FindOneByChoferRut(@Body() chofer: Partial<Chofer>): Promise<ResponsePayload>{
        try{
            return {
                data: await this.service.FindByChoferRut(chofer.rut),
                message: "Bus encontrado",
                error: false
            }
        }catch(error){
            return {
                message: error.message,
                error: true
            }
        }
    }

    @Post('create')
    async CreateNewBus(@Body() bus: Partial<Bus>): Promise<ResponsePayload>{
	try{
	    return {
		data: await this.service.CreateBus(bus),
		error: false,
		message: "Bus creado"
	    }
	}catch(error: any){
	    return {
		error: true,
		message: error.message
	    }
	}
    }

    @Post('create-many')
    async CreateMany(@Body() buses: Partial<Bus>[]): Promise<ResponsePayload>{
	try{
	    return {
		data: await this.service.CreateMany(buses),
		message: "Buses añadidos",
		error: false
	    }
	}catch(err: any){
	    return {
		message: "Error al crear buses",
		error: true
	    }
	}
    }

    @Put('update')
    async UpdateBus(@Body() bus: Partial<Bus>): Promise<ResponsePayload>{
        try{
            return await this.service.UpdateBus(bus)
        }catch(error: any){
            return {
                message: error.message,
                error: true
            }
        }
    }

    @Delete('delete')
    async DeleteBus(@Body() bus: Partial<Bus>): Promise<ResponsePayload>{
        try{
            return await this.service.DeleteBus(bus)
        }catch(error: any){
            return {
                message: error.message,
                error: true
            }
        }
    }
}
