import { UserService } from './user.service';
import { Controller, Get, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Patch('profile')
  updateProfile(@Req() req, @Body() dto: UpdateUserDto ) {
    return this.userService.updateProfile(req.user.id, dto);
  }
}
 