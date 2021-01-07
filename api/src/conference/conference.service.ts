import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conference } from './conference.entity';
import { User } from '@src/user/user.entity';
import {
  CreateConferenceInput,
  UpdateConferenceInput,
} from './conference.types';

@Injectable()
export class ConferenceService {
  constructor(
    @InjectRepository(Conference)
    private ConferenceRepository: Repository<Conference>,
  ) {}

  async findConferenceById(ConferenceId: string): Promise<Conference> {
    const Conference = await this.ConferenceRepository.findOne(ConferenceId);

    if (!Conference) {
      throw new NotFoundException('Consulta não encontrado');
    }

    return Conference;
  }

  async showConferences(): Promise<Conference[]> {
    const Conferences = await this.ConferenceRepository.find();

    return Conferences;
  }

  async createConference(
    ConferenceInput: CreateConferenceInput,
  ): Promise<Conference> {
    const newConference = this.ConferenceRepository.create(ConferenceInput);

    await this.ConferenceRepository.save(newConference);

    return newConference;
  }

  async deleteConference(user: User, ConferenceId: string) {
    const currentConference = await this.ConferenceRepository.findOne(
      ConferenceId,
    );

    if (!currentConference) {
      throw new NotFoundException('Consulta não encontrado ou inexistente');
    }

    if (currentConference.clientId !== user.id) {
      throw new UnauthorizedException('Usuário não é cliente desta consulta');
    }

    await this.ConferenceRepository.delete({ id: ConferenceId });

    return { message: 'deleted' };
  }

  async updateConference(
    user: User,
    ConferenceId: string,
    updateConferenceInput: UpdateConferenceInput,
  ): Promise<Conference> {
    const currentConference = await this.ConferenceRepository.findOne(
      ConferenceId,
    );

    if (!currentConference) {
      throw new NotFoundException('Consulta não encontrado ou inexistente');
    }

    if (currentConference.clientId !== user.id) {
      throw new UnauthorizedException('Usuário não é o cliente desta consulta');
    }

    const { affected: RowsUpdated } = await this.ConferenceRepository.update(
      { id: ConferenceId },
      updateConferenceInput,
    );

    if (RowsUpdated <= 0) {
      return currentConference;
    }

    return {
      ...currentConference,
      ...updateConferenceInput,
    };
  }
}
