import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { TeacherModel } from './index';

@Table({
  tableName: 'preferences',
  timestamps: true,
  underscored: true,
})
export class PreferenceModel extends Model<PreferenceModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare public id: number;

  @Column({
    type: DataType.STRING,
  })
  public day: string;

  @Column({
    type: DataType.STRING,
  })
  public turn: string;

  @ForeignKey(() => TeacherModel)
  @Column({
    type: DataType.INTEGER,
  })
  public teacher_id: number;

  @BelongsTo(() => TeacherModel)
  public teacher?: TeacherModel;
}
