import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CourseModel, TeacherModel, SubjectTeacherModel } from './index';

@Table({
  tableName: 'subjects',
  timestamps: true,
  underscored: true,
})
export class SubjectModel extends Model<SubjectModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare public id: number;

  @Column({
    type: DataType.STRING,
  })
  public name: string;

  @Column({
    type: DataType.INTEGER,
  })
  public workload: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  public is_optional: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  public course_semester: number;

  @ForeignKey(() => SubjectModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public prerequisite_id?: number;

  @BelongsTo(() => SubjectModel)
  public prerequisite?: SubjectModel;

  @ForeignKey(() => CourseModel)
  @Column({
    type: DataType.INTEGER,
  })
  public course_id: number;

  @BelongsTo(() => CourseModel)
  public course: CourseModel;

  @BelongsToMany(() => TeacherModel, () => SubjectTeacherModel)
  public teachers?: TeacherModel[];
}
