import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table === 'product'
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  details: string;

  @Column()
  category: string;

  @Column()
  likes: number;

  @Column()
  image: string;

  @Column()
  isEnabled: boolean;
}
