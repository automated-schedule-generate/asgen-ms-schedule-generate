import { preferenceMapper } from './';
import { TeacherEntity } from '../../domain/entities';
import { IMapper } from '../../domain/interfaces';
import { TeacherModel } from '../models';

export class TeacherMapper implements IMapper<TeacherEntity, TeacherModel> {
  toEntity(teacherModel: TeacherModel): TeacherEntity {
    const teacherEntity = new TeacherEntity(
      teacherModel.user_id,
      teacherModel.workload,
      teacherModel.special_need,
      teacherModel.description_special_need,
      teacherModel.observation,
    );

    if (teacherModel.preferences) {
      teacherEntity.preferences = teacherModel.preferences.map((preferenceModel) =>
        preferenceMapper.toEntity(preferenceModel.dataValues),
      );
    }

    return teacherEntity;
  }
}
