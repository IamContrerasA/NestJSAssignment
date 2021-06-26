import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

Index(['email']);
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
