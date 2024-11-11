import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'orders',
  timestamps: true,
  paranoid: true,
})
export class Order extends Model<Order> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({ type: DataType.DATE })
  readonly createdAt?: Date;

  @Column({ type: DataType.DATE })
  readonly updatedAt?: Date;

  @Column({ type: DataType.DATE })
  readonly deletedAt?: Date;
}