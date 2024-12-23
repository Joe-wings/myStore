import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
//规范化用户输入的type
export class CreateUserDto {
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        username: string;
    
        @ApiProperty()
        @IsEmail()
        @IsNotEmpty()
        email: string;
    
        @ApiProperty()
        @IsNotEmpty()
        password: string;
}
