import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { DiscordModule } from './shared/discord/discord.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/guards/auth.guard';
import { GeocodingModule } from './shared/geocoding/geocoding.module';
import { SessionsModule } from './app/sessions/sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    DiscordModule,
    SessionsModule,
    GeocodingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
