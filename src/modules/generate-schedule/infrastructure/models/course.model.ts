import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ClassModel, ClassroomModel, SubjectModel } from './index';
import { ClassTimeEnum } from '../../domain/enums/';

@Table({
  tableName: 'courses',
  timestamps: true,
  underscored: true,
})
export class CourseModel extends Model<CourseModel> {
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
  public total_semesters: number;

  @Column({
    type: DataType.ENUM(...Object.values(ClassTimeEnum).map(String)),
    defaultValue: ClassTimeEnum.MIN45,
  })
  public class_time: ClassTimeEnum;

  @HasMany(() => SubjectModel)
  public subjects?: SubjectModel[];

  @HasMany(() => ClassModel)
  public classes?: ClassModel[];

  @HasMany(() => ClassroomModel)
  public classrooms?: ClassroomModel[];
}
