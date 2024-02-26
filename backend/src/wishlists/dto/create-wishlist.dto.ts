import { IsArray, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @Length(1, 250)
  @IsString()
  name: string;

  @IsUrl()
  @IsString()
  image: string;

  @IsArray()
  @IsOptional()
  itemsId: number[] = [];
}
