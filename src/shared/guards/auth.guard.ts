import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import axios from 'axios';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';
import { prisma } from '../client';
import { DiscordUserData } from '../types/discord.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { data: discordUserData } = await axios.get<DiscordUserData>(
        'https://discord.com/api/users/@me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const userInDatabase = await prisma.user.findUnique({
        where: { discordId: discordUserData.id },
      });
      // 💡 We're assigning the user data to the request object here
      // so that we can access it in our route handlers
      request.user = {
        ...discordUserData,
        // user id from database overrides user id from discord
        // user discord id is now in the discordId field
        ...userInDatabase,
      };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
