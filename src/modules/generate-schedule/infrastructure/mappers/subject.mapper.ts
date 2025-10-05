import { teacherMapper } from './';
import { SubjectEntity } from '../../domain/entities';
import { IMapper } from '../../domain/interfaces';
import { SubjectModel } from '../models';

export class SubjectMapper implements IMapper<SubjectEntity, SubjectModel> {
  toEntity(subjectModel: SubjectModel): SubjectEntity {
    const subjectEntity = new SubjectEntity(
      subjectModel.id,
      subjectModel.name,
      subjectModel.workload,
      subjectModel.is_optional,
      subjectModel.course_semester,
      subjectModel.course_id,
      subjectModel.prerequisite_id,
    );
    if (subjectModel.teachers) {
      subjectEntity.teachers = subjectModel.teachers.map((teacherModel) =>
        teacherMapper.toEntity(teacherModel.dataValues),
      );
    }
    return subjectEntity;
  }
}
