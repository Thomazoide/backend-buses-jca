import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Bus } from "src/models/bus.entity";
import { Chofer } from "src/models/chofer.entity";

@Injectable()
export class DbConfig implements TypeOrmOptionsFactory{
    constructor(
        private readonly configService: ConfigService
    ){}

    createTypeOrmOptions(): TypeOrmModuleOptions{
        return {
            type: 'mysql',
            host: this.configService.get<string>('HOST'),
            port: this.configService.get<number>('PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASS'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [Bus, Chofer],
            synchronize: true
        }
    }
}