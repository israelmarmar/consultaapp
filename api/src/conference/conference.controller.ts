import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Conference } from './conference.entity';
import { ConferenceService } from './conference.service';
import { CreateConferenceInput } from './conference.types';
import { RolesGuard } from './roles.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '@src/user/user.entity';

@Controller('conference')
export class ConferenceController {
  constructor(private conferenceService: ConferenceService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async createConference(
    @Body() conference: CreateConferenceInput,
    @GetUser() user: User,
  ): Promise<Conference> {
    return this.conferenceService.createConference({
      ...conference,
      user: user,
    });
  }

  @Get(':id/find')
  async findConferenceById(
    @Param('id') conferenceId: string,
  ): Promise<Conference> {
    return this.conferenceService.findConferenceById(conferenceId);
  }

  @Get('show')
  @UseGuards(AuthGuard(), RolesGuard)
  async showConferences(): Promise<Conference[]> {
    return this.conferenceService.showConferences();
  }
}
