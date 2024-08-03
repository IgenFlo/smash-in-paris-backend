import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscordService } from './discord.service';
import { CodeDto } from './discord.dto.ts/code.dto';
import { Public } from '../decorators/public.decorators';

@ApiTags('Discord')
@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Public()
  @Get()
  getDiscordAuthorizationUrl() {
    return this.discordService.getDiscordAuthorizationUrl();
  }

  @Public()
  @Get('callback')
  getDiscordAuthorizationCallback(@Query() query: CodeDto) {
    return this.discordService.verifyCode(query.code);
  }
}
