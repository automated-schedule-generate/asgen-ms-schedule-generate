import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CourseModel, SemesterModel } from './';

@Table({
  tableName: 'classes',
  timestamps: true,
  underscored: true,
})
export class ClassModel extends Model<ClassModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare public id: number;

  @Column({
    type: DataType.STRING,
  })
  public turn: string;

  @Column({
    type: DataType.INTEGER,
  })
  public course_semester: number;

  @ForeignKey(() => CourseModel)
  @Column({
    type: DataType.INTEGER,
  })
  public course_id: number;

  @ForeignKey(() => SemesterModel)
  @Column({
    type: DataType.INTEGER,
  })
  public semester_id: number;

  @BelongsTo(() => CourseModel)
  public course?: CourseModel;

  @BelongsTo(() => SemesterModel)
  public semester?: SemesterModel;
}
