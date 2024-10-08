import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { DrinksController } from './drinks.controller.js';

import { AppService } from './app.service.js';
import { DbService } from './db.service.js';
import { DrinksService } from './drinks.service.js';

@Module({
  imports: [],
  controllers: [AppController, DrinksController],
  providers: [AppService, DbService, DrinksService],
})
export class AppModule {}
