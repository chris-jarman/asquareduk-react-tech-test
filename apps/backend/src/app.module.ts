import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DrinksController } from './drinks.controller';

import { AppService } from './app.service';
import { DbService } from './db.service';
import { DrinksService } from './drinks.service';

@Module({
  imports: [],
  controllers: [AppController, DrinksController],
  providers: [AppService, DbService, DrinksService],
})
export class AppModule {}
