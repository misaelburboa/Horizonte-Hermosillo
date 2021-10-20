import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendee } from './attendees.entity';

@Entity()
export class Event {
  public static readonly DOUBLE_SEAT_QUANTITY = 24;
  public static readonly SINGLE_SEAT_QUANTITY = 20;

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  singleSeatsNumber: number;

  @Column()
  doubleSeatsNumber: number;

  @ManyToOne(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee[];
}
