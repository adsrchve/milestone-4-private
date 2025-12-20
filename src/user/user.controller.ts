import { UserService } from './user.service';
import { Controller, Get, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.userId);
  }

  @Patch('profile')
  updateProfile(@Req() req, @Body() dto: UpdateUserDto ) {
    return this.userService.updateProfile(req.user.id, dto);
  }
}
 