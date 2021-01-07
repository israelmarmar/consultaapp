import { User } from '../user/user.entity';

export interface CreateConferenceInput {
  user?: User;
  services: string;
  minutes: string;
}

export interface UpdateConferenceInput {
  user?: User;
  services: string;
  minutes: string;
}
