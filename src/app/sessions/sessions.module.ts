import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { GeocodingModule } from 'src/shared/geocoding/geocoding.module';

@Module({
  imports: [GeocodingModule],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
