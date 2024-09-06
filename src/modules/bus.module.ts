import { Module } from "@nestjs/common";
import { BusService } from "src/services/bus.service";
import { BusController } from "src/controllers/bus.controller";
import { Bus } from "src/models/bus.entity";
import { Chofer } from "src/models/chofer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Bus, Chofer])],
    providers: [BusService],
    controllers: [BusController]
})
export class BusModule{}