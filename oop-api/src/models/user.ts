import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export default class User extends Model {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name',
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'email',
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'password',
  })
  password?: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  readonly createdAt?: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  readonly updatedAt?: Date;

  @Column({ type: DataType.DATE, field: 'deleted_at' })
  readonly deletedAt?: Date;
}