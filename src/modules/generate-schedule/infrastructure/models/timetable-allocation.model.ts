import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ClassModel, SubjectModel, SemesterModel } from './';

@Table({
  tableName: 'timetable_allocation',
  timestamps: true,
  underscored: true,
})
export class TimetableAllocationModel extends Model<TimetableAllocationModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare public id: number;

  @Column({
    type: DataType.STRING,
  })
  public day: string;

  @ForeignKey(() => ClassModel)
  @Column({
    type: DataType.INTEGER,
  })
  public class_id: number;

  @ForeignKey(() => SubjectModel)
  @Column({
    type: DataType.INTEGER,
  })
  public subject_id: number;

  @ForeignKey(() => SemesterModel)
  @Column({
    type: DataType.INTEGER,
  })
  public semester_id: number;

  @BelongsTo(() => ClassModel)
  public class?: ClassModel;

  @BelongsTo(() => SubjectModel)
  public subject?: SubjectModel;

  @BelongsTo(() => SemesterModel)
  public semester?: SemesterModel;
}
