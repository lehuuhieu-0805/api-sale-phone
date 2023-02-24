import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  totalPrice: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  totalQuantity: number;

  @ApiProperty({ type: Date })
  dateCreated: Date;

  @ApiProperty()
  @IsNotEmpty()
  status: string;
}
