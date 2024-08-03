import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { prisma } from '../../shared/client';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const { discordId } = createUserDto;
    return prisma.user.create({
      data: { discordId },
    });
  }
}
