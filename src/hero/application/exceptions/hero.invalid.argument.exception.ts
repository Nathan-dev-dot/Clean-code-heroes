import { NotFoundException } from '@nestjs/common';

export class HeroInvalidArgumentException extends NotFoundException {
  constructor() {
    super(`Invalid argument detected`);
  }
}
