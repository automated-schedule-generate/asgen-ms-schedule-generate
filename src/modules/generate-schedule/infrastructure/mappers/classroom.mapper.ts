import { ClassroomEntity } from '../../domain/entities';
import { IMapper } from '../../domain/types';
import { ClassroomModel } from '../models';

export class ClassroomMapper implements IMapper<ClassroomEntity, ClassroomModel> {
  toEntity(classroomModel: ClassroomModel): ClassroomEntity {
    return new ClassroomEntity(classroomModel.id, classroomModel.name, classroomModel.course_preference_id);
  }
}
