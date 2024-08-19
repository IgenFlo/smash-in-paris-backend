import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { prisma } from '../../shared/client';
import { GeocodingService } from 'src/shared/geocoding/geocoding.service';
import { UserInRequest } from 'src/shared/types/users.types';
import { SearchSessionsFiltersDto } from './dto/search-sessions-filters.dto';

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

  async findNearest(user: UserInRequest, filters: SearchSessionsFiltersDto) {
    const { lat, lon } = filters;

    const nearestSessions: Array<{ id: number }> = await prisma.$queryRaw`
      SELECT s.id,
            (6371 * acos(cos(radians(${lat})) * cos(radians(a.latitude)) * cos(radians(a.longitude) - radians(${lon})) + sin(radians(${lat})) * sin(radians(a.latitude)))) AS distance
      FROM Session s
      JOIN Address a ON s.id = a.sessionId
      JOIN User u ON s.creatorId = u.id
      WHERE s.startAt > NOW()
      ORDER BY distance
    `;

    const sessions = nearestSessions.map(({ id }) => {
      return prisma.session.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          startAt: true,
          seatsCount: true,
          address: {
            select: {
              displayName: true,
              latitude: true,
              longitude: true,
            },
          },
          participants: {
            select: {
              id: true,
            },
          },
        },
      });
    });

    return await Promise.all(sessions);
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
