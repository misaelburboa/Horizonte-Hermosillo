import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  secondName?: string;

  @Column()
  mainPhone: string;

  @Column()
  secondPhone?: string;

  @Column()
  seatType: string;

  @ManyToMany(() => Event, (event) => event.attendees)
  events: Event[];
}
