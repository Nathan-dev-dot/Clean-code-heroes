import { NotFoundException } from '@nestjs/common';

export class HeroNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Hero with id ${id} not found`);
  }
}
