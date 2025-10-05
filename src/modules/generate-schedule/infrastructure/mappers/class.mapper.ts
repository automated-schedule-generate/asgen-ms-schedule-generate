import { ClassEntity } from '../../domain/entities';
import { IMapper } from '../../domain/interfaces';
import { ClassModel } from '../models';

export class ClassMapper implements IMapper<ClassEntity, ClassModel> {
  toEntity(classModel: ClassModel): ClassEntity {
    return new ClassEntity(
      classModel.id,
      classModel.turn,
      classModel.course_semester,
      classModel.course_id,
      classModel.semester_id,
    );
  }
}
