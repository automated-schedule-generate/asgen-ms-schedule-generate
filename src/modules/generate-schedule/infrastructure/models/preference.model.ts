import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { TeacherModel } from './';
import { PreferenceDayEnum, PreferenceTurnEnum } from '../../domain/enums/';

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
    type: DataType.ENUM(...Object.values(PreferenceDayEnum).map(String)),
  })
  public day: PreferenceDayEnum;

  @Column({
    type: DataType.ENUM(...Object.values(PreferenceTurnEnum)),
  })
  public turn: PreferenceTurnEnum;

  @ForeignKey(() => TeacherModel)
  @Column({
    type: DataType.INTEGER,
  })
  public teacher_id: number;

  @BelongsTo(() => TeacherModel)
  public teacher?: TeacherModel;
}
