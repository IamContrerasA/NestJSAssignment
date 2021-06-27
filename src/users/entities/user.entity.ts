import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table === 'user'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(() => Order, (order) => order.user)
  orders: Order;
}
