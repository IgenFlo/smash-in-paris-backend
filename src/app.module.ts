import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { DiscordModule } from './shared/discord/discord.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DiscordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
