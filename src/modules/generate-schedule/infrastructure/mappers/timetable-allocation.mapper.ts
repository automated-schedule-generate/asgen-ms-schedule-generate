import { TimetableAllocationEntity } from '../../domain/entities';
import { IMapper } from '../../domain/interfaces';
import { TimetableAllocationModel } from '../models';

export class TimetableAllocationMapper implements IMapper<TimetableAllocationEntity, TimetableAllocationModel> {
  toEntity(timetableAllocationModel: TimetableAllocationModel): TimetableAllocationEntity {
    return new TimetableAllocationEntity(
      timetableAllocationModel.id,
      timetableAllocationModel.day,
      timetableAllocationModel.class_id,
      timetableAllocationModel.subject_id,
    );
  }
}
