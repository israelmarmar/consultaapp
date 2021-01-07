import { Controller, Post, Delete, Body, Param, Get, UseGuards, Query } from '@nestjs/common';
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

  @Get('create')
  @UseGuards(AuthGuard())
  async createConference(
    @Query() conference: CreateConferenceInput,
    @GetUser() user: User,
  ): Promise<Conference> {
    console.log(conference);
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

  @Delete('delete/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  async deleteCourse(
    @Param('id') conferenceId: string,
    @GetUser() user: User
  ) {
    return this.conferenceService.deleteConference(user, conferenceId);
  }

  @Get('show')
  @UseGuards(AuthGuard(), RolesGuard)
  async showConferences(): Promise<Conference[]> {
    return this.conferenceService.showConferences();
  }
}
