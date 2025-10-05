import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { SubjectModel, TeacherModel, SemesterModel } from './';

@Table({
  tableName: 'subject_teachers',
  timestamps: true,
  underscored: true,
})
export class SubjectTeacherModel extends Model<SubjectTeacherModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare public id: number;

  @ForeignKey(() => SubjectModel)
  @Column({
    type: DataType.INTEGER,
  })
  public subject_id: number;

  @ForeignKey(() => TeacherModel)
  @Column({
    type: DataType.INTEGER,
  })
  public teacher_id: number;

  @ForeignKey(() => SemesterModel)
  @Column({
    type: DataType.INTEGER,
  })
  public semester_id: number;

  @BelongsTo(() => SubjectModel)
  public subject: SubjectModel;

  @BelongsTo(() => TeacherModel)
  public teacher?: TeacherModel;

  @BelongsTo(() => SemesterModel)
  public semester?: SemesterModel;
}
