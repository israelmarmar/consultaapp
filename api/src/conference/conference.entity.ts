import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity('conferences')
export class Conference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  services: string;

  @Column()
  minutes: string;

  @Column()
  clientId: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'clientId', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
