import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SubjectModel, SubjectTeacherModel, SemesterModel, PreferenceModel } from './index';

@Table({
  tableName: 'teachers',
  timestamps: true,
  underscored: true,
})
export class TeacherModel extends Model<TeacherModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  public user_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  public workload: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  public special_need: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public description_special_need?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public observation?: string;

  @BelongsToMany(() => SubjectModel, () => SubjectTeacherModel)
  public subjects?: SubjectModel[];

  @BelongsToMany(() => SemesterModel, () => SubjectTeacherModel)
  public semesters?: SemesterModel[];

  @HasMany(() => PreferenceModel)
  public preferences?: PreferenceModel[];
}
