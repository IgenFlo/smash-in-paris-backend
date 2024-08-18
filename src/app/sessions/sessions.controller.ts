import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { DUser } from 'src/shared/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserInRequest } from 'src/shared/types/users.types';
import { SearchSessionsFiltersDto } from './dto/search-sessions-filters.dto';

@ApiTags('Sessions')
@Controller('sessions')
@ApiBearerAuth()
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(
    @DUser() user: UserInRequest,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    return this.sessionsService.create(user, createSessionDto);
  }

  @Get()
  findNearest(
    @DUser() user: UserInRequest,
    @Query() filters: SearchSessionsFiltersDto,
  ) {
    return this.sessionsService.findNearest(user, filters);
  }

  @Get('mine')
  findAllMine(@DUser() user: UserInRequest) {
    return this.sessionsService.findAllMine(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Delete(':id')
  remove(@DUser() user: UserInRequest, @Param('id') id: string) {
    return this.sessionsService.remove(user, +id);
  }
}
