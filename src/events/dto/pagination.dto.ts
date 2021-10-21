import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageSize: number;
}
