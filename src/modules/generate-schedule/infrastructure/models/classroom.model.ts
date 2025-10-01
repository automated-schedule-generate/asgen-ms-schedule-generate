import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CourseModel } from './';

@Table({
  tableName: 'classrooms',
  timestamps: true,
  underscored: true,
})
export class ClassroomModel extends Model<ClassroomModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare public id: number;

  @Column({
    type: DataType.INTEGER,
  })
  public name: number;

  @ForeignKey(() => CourseModel)
  @Column({
    type: DataType.INTEGER,
  })
  public course_preference_id: number;

  @BelongsTo(() => CourseModel)
  public course?: CourseModel;
}
