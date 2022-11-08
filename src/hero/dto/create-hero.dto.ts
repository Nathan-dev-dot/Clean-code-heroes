import { IsNotEmpty } from 'class-validator';

export class CreateHeroDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  healthPoints: number;

  @IsNotEmpty()
  experiencePoints: number;

  @IsNotEmpty()
  power: number;

  @IsNotEmpty()
  armour: number;

  @IsNotEmpty()
  specialty: string;

  @IsNotEmpty()
  rarity: string;
}
