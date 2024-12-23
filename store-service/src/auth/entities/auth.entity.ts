import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length,IsNotEmpty } from "class-validator";
export class AuthEntity {
    @ApiProperty()
    access_token: string;

}
