import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeachController } from "./beach.controller";

@Module({
  imports: [],
  controllers: [AppController, BeachController],
  providers: [AppService],
})
export class AppModule {}
