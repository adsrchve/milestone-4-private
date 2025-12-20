import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @ApiProperty({ example: 'user@mail.com' })
    email: string;
    
    @IsNotEmpty()
    @ApiProperty({ example: 'password123' })
    password: string;
}