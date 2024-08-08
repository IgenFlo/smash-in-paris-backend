import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { DUser } from 'src/shared/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserInRequest } from 'src/shared/types/users.types';

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
  findAll() {
    return this.sessionsService.findAll();
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
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
