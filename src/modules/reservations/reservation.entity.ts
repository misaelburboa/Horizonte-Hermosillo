import { Column } from 'typeorm';

export class Reservation {
  @Column()
  id: string;

  @Column()
  event: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  seat: string;

  @Column()
  cancellationCode: string;
}
