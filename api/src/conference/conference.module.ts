import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceController } from './conference.controller';
import { Conference } from './conference.entity';
import { ConferenceService } from './conference.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conference]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ConferenceService],
  controllers: [ConferenceController],
  exports: [TypeOrmModule],
})
export class ConferenceModule {}
