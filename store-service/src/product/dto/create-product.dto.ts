import { IsString, IsNotEmpty,IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    count:number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    groupId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    creatorId: number;

    @ApiProperty({required: false})
    @IsString()
    image?: string;
}
