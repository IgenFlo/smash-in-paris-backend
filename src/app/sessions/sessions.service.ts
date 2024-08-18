import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { prisma } from '../../shared/client';
import { GeocodingService } from 'src/shared/geocoding/geocoding.service';
import { UserInRequest } from 'src/shared/types/users.types';

@Injectable()
export class SessionsService {
  constructor(private readonly geocodingService: GeocodingService) {}

  async create(user: UserInRequest, createSessionDto: CreateSessionDto) {
    const { title, description, startAt, seatsCount, latLon } =
      createSessionDto;
    const address =
      await this.geocodingService.reverseGeocodeWithLatLon(latLon);

    return prisma.session.create({
      data: {
        title,
        description,
        startAt,
        seatsCount,
        address: {
          create: {
            displayName: address.display_name,
            placeId: address.place_id.toString(),
            latitude: Number(address.lat),
            longitude: Number(address.lon),
          },
        },
        creator: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findAllMine(user: UserInRequest) {
    return prisma.session.findMany({
      where: {
        creatorId: user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        startAt: true,
        seatsCount: true,
        address: {
          select: {
            displayName: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return prisma.session.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(user: UserInRequest, id: number) {
    const session = await this.findOne(id);
    if (!session) throw new NotFoundException();
    if (session.creatorId !== user.id)
      throw new ForbiddenException('You are not the creator of this session');
    return prisma.session.delete({
      where: {
        id,
      },
    });
  }
}
