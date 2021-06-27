import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table === 'order'
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  approved: boolean;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Product, (product) => product.orders)
  products: Product[];
}
