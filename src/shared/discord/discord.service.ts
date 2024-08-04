import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DiscordUserData } from '../types/discord.types';
import { UsersService } from 'src/app/users/users.service';

@Injectable()
export class DiscordService {
  private clientId = process.env.DISCORD_CLIENT_ID;
  private clientSecret = process.env.DISCORD_CLIENT_SECRET;
  private redirectUri = `${process.env.FRONTEND_URL}/callback`;
  private discordBaseAuthorizationUrl = 'https://discord.com/oauth2/authorize';
  private discordTokenUrl = 'https://discord.com/api/oauth2/token';

  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {}

  getDiscordAuthorizationUrl() {
    return `${this.discordBaseAuthorizationUrl}?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      this.redirectUri,
    )}&scope=identify+connections`;
  }

  async verifyCode(code: string) {
    try {
      const tokenResponse = await this.httpService.axiosRef.post(
        this.discordTokenUrl,
        new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'authorization_code',
          scope: 'identify connections',
          code,
          redirect_uri: this.redirectUri,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      const { id, username } = await this.getDiscordUser(
        tokenResponse.data.access_token,
      );

      await this.usersService.upsert({
        discordId: id,
        discordUsername: username,
      });

      return tokenResponse.data.access_token;
    } catch (error) {
      Logger.error(
        'Error during OAuth process:',
        error.response ? error.response.data : error.message,
      );
      throw new BadRequestException(
        'An error occurred during the OAuth process',
      );
    }
  }

  async getDiscordUser(accessToken: string): Promise<DiscordUserData> {
    try {
      const userResponse = await this.httpService.axiosRef.get(
        'https://discord.com/api/users/@me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return userResponse.data;
    } catch (error) {
      Logger.error(
        'Error during OAuth process:',
        error.response ? error.response.data : error.message,
      );
      throw new BadRequestException(
        'An error occurred during the OAuth process',
      );
    }
  }
}
