import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @ApiProperty({ example: 'user@mail.com' })
    email: string;
    
    @IsString()
    @MinLength(8)
    @ApiProperty({ example: 'password123' })
    password: string;
    
    @IsString()
    @ApiProperty({ example: 'John' })
    name: string;
}
