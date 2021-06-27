import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
