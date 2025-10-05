import { AllocationTimeEntity } from 'src/modules/generate-schedule/domain/entities';
import { AllocationTimeModel } from '../models';
import { IMapper } from '../../domain/interfaces';

export class AllocationTimeMapper implements IMapper<AllocationTimeEntity, AllocationTimeModel> {
  toEntity(allocationTimeModel: AllocationTimeModel): AllocationTimeEntity {
    return new AllocationTimeEntity(
      allocationTimeModel.id,
      allocationTimeModel.slot_time,
      allocationTimeModel.timetable_allocation_id,
    );
  }
}
