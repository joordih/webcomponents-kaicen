import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from '@models/user';
// import { CustomerStaff } from './CustomerStaff';

@Table({
  tableName: 'email_errors',
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: ['id'],
    },
  ],
})
export default class EmailError extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userType!: string;

  @ForeignKey(() => User)
  // @ForeignKey(() => CustomerStaff)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  emailTemplate!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  error!: string;

  @Column({
    type: DataType.DATE,
    get() {
      return this.getDataValue('createdAt')
        ? this.getDataValue('createdAt').toISOString().split('T')[0]
        : null;
    },
  })
  readonly createdAt?: Date;

  @Column({
    type: DataType.DATE,
    get() {
      return this.getDataValue('updatedAt')
        ? this.getDataValue('updatedAt').toISOString().split('T')[0]
        : null;
    },
  })
  readonly updatedAt?: Date;

  @BelongsTo(() => User)
  user?: User;

  // @BelongsTo(() => CustomerStaff)
  // customerStaff?: CustomerStaff;
}