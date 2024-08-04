import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DUser } from 'src/shared/decorators/user.decorator';
import { DiscordUserData } from 'src/shared/types/discord.types';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@DUser() user: DiscordUserData) {
    return user;
  }
}
