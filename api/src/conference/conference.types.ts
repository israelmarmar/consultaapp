import { User } from '../user/user.entity';

export interface CreateConferenceInput {
  user?: User;
  Conferences: string;
  minutes: string;
}

export interface UpdateConferenceInput {
  user?: User;
  Conferences: string;
  minutes: string;
}
