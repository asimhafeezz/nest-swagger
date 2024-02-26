import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';

export enum USER_SHIFT_STATUS {
  UNSCHEDULED = 'UNSCHEDULED',
  ADDED_ROASTER = 'ADDED_ROASTER',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: number;
}


@Entity('event_shift')
export class EventShiftEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  name: string;
}

@Entity('user_shift_request')
export class UserShiftRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.id)
  user: UserEntity;

  @ManyToOne(() => EventShiftEntity, eventShift => eventShift.id)
  eventShift: EventShiftEntity;

  @Column()
  status: USER_SHIFT_STATUS;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity('user_shift')
export class UserShiftEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.id)
  user: UserEntity;

  @ManyToOne(() => EventShiftEntity, eventShift => eventShift.id)
  eventShift: EventShiftEntity;

  @CreateDateColumn()
  createdAt: Date;
}