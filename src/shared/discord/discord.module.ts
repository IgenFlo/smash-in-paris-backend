import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/app/users/users.module';

@Module({
  imports: [HttpModule, UsersModule],
  providers: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
