import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'name', unique: true, length: 60, nullable: false})
  name: string;

  @Column({name: 'description', length: 250, nullable: true})
  description: string;

  @Column({name: 'price', type: 'decimal', precision: 10, scale: 2, nullable: false})
  price: number;

  @Column({name: 'stock', type: 'int', nullable: false})
  stock: number;
  
  @ManyToOne(() => CategoryEntity, {eager: true, nullable: false})
  category: CategoryEntity;

  @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}