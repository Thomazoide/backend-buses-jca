import { Module } from "@nestjs/common";
import { ChoferService } from "src/services/chofer.service";
import { ChoferController } from "src/controllers/chofer.controller";
import { Chofer } from "src/models/chofer.entity";
import { Bus } from "src/models/bus.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Chofer, Bus])],
    providers: [ChoferService],
    controllers: [ChoferController]
})
export class ChoferModule{}