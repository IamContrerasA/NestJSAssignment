import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Order, (order) => order.products)
  orders: Order[];
}
