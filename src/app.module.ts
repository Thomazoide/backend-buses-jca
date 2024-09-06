import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './services/dbconfig.service';
import { ConfigModule } from '@nestjs/config';
import { ChoferModule } from './modules/chofer.module';
import { BusModule } from './modules/bus.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbConfig
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ChoferModule,
    BusModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
