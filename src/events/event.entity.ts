import { Column } from 'typeorm';

export class Event {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  date: Date;
}
