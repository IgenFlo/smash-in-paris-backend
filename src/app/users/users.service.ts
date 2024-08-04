import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { prisma } from '../../shared/client';

@Injectable()
export class UsersService {
  upsert(createUserDto: CreateUserDto) {
    const { discordId, discordUsername } = createUserDto;
    return prisma.user.upsert({
      where: { discordId },
      create: { discordId, discordUserName: discordUsername },
      update: { discordId, discordUserName: discordUsername },
    });
  }
}
