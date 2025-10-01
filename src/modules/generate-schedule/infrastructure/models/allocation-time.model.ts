import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { TimetableAllocationModel } from './index';

@Table({
  tableName: 'timetable_allocations',
  timestamps: true,
  underscored: true,
})
export class AllocationTimeModel extends Model<AllocationTimeModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare public id: number;

  @Column({
    type: DataType.STRING,
  })
  public slot_time: string;

  @ForeignKey(() => TimetableAllocationModel)
  @Column({
    type: DataType.INTEGER,
  })
  public timetable_allocation_id: number;
}
