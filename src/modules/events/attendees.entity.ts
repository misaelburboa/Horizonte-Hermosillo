import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attendeeFullName: string;

  @Column({ nullable: true })
  secondAttendeeFullName?: string;

  @Column()
  phone1: string;

  @Column({ nullable: true })
  phone2?: string;

  @Column({ nullable: true })
  seatNumber?: string;

  @Column()
  seatType: string;

  @Column({
    nullable: true,
  })
  temperature: number;

  @Column({
    nullable: true,
    type: 'time',
  })
  arrivalTime: Date;

  @Column()
  cancellationCode: string;

  @Column({
    default: false,
  })
  isCancel: boolean;

  @ManyToOne(() => Event, (event) => event.attendees)
  event: Event;

  @CreateDateColumn()
  createdAt: Date;
}
