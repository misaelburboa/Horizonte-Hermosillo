import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    required: true,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page: number;

  @ApiProperty({
    required: true,
  })
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageSize: number;
}
