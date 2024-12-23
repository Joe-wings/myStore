import { IsEmail, IsString, Matches, MaxLength, MinLength,IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
