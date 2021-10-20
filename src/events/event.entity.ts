import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendee } from './atendees.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @ManyToMany(() => Attendee, (attendee) => attendee.events)
  attendees: Attendee[];
}
