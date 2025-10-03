import { SemesterEntity } from '../../domain/entities';
import { IMapper } from '../../domain/types';
import { SemesterModel } from '../models';

export class SemesterMapper implements IMapper<SemesterEntity, SemesterModel> {
  toEntity(semesterModel: SemesterModel): SemesterEntity {
    return new SemesterEntity(semesterModel.id, semesterModel.age, semesterModel.semester);
  }
}
