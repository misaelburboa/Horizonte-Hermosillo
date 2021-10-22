import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  cancellationCode: string;

  @Column({
    default: false,
  })
  isCancel: boolean;

  @ManyToOne(() => Event, (event) => event.attendees)
  event: Event;
}