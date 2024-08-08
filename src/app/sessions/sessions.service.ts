import { Injectable } from '@nestjs/common';
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
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
