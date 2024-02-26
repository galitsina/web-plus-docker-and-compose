import { IsArray, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @Length(1, 250)
  @IsString()
  name: string;

  @IsUrl()
  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsArray()
  itemsIds: number[];
}
