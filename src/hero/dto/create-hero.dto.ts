import { IsNotEmpty } from 'class-validator';

export class CreateHeroDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  specialty: string;

  @IsNotEmpty()
  rarity: string;
}
