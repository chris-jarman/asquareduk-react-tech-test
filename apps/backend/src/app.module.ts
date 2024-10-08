import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DrinksController } from './drinks.controller';

import { AppService } from './app.service';
import { DrinksService } from './drinks.service';

@Module({
  imports: [],
  controllers: [AppController, DrinksController],
  providers: [AppService, DrinksService],
})
export class AppModule {}
