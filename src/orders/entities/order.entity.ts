import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() // sql table === 'order'
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  approved: boolean;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @JoinTable()
  @ManyToMany(() => Product, (product) => product.orders, {
    cascade: true,
  })
  products: Product[];
}
