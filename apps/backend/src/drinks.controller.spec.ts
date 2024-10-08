import { Test, TestingModule } from '@nestjs/testing';

import { DrinksController } from './drinks.controller';
import { DrinksService } from './drinks.service';
import { NotFoundException } from '@nestjs/common';

describe('DrinksController', () => {
  let drinksController: DrinksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DrinksController],
      providers: [DrinksService],
    }).compile();

    drinksController = app.get<DrinksController>(DrinksController);
  });

  describe('/', () => {
    it('should return an array of drinks', async () => {
      const drinks = await drinksController.getDrinks();
      expect(Array.isArray(drinks)).toBe(true);
      expect(drinks.length).toBeGreaterThan(0);
      drinks.forEach((drink) => {
        expect(drink).toMatchObject({
          slug: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
        });
      });
    });
  });

  describe('/:slug', () => {
    it('should return the drink with the given slug', async () => {
      const drink = await drinksController.getDrinkBySlug('1');
      expect(drink).toMatchObject({
        slug: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
      });
    });

    it('should throw if no drink exists with the given slug', () => {
      expect(() => drinksController.getDrinkBySlug('0')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
