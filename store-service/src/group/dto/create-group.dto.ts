import { IsString, IsNotEmpty,IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateGroupDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({required: false}) // optional property
    @IsNumber()
    @IsOptional()
    fatherId: number;
    
}
