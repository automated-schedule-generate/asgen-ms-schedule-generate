import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { SubjectModel, TeacherModel, SubjectTeacherModel } from './index';

@Table({
  tableName: 'semesters',
  timestamps: true,
  underscored: true,
})
export class SemesterModel extends Model<SemesterModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare public id: number;

  @Column({
    type: DataType.INTEGER,
  })
  public age: number;

  @Column({
    type: DataType.STRING,
  })
  public semester: string;

  @BelongsToMany(() => SubjectModel, () => SubjectTeacherModel)
  public subjects?: SubjectModel[];

  @BelongsToMany(() => TeacherModel, () => SubjectTeacherModel)
  public teachers?: TeacherModel[];
}
