import { TimetableAllocationEntity } from './';

export class AllocationTimeEntity {
  id: number;
  slot_time: string;
  timetable_allocation_id: number;

  timetableAllocation?: TimetableAllocationEntity;

  constructor(id: number, slot_time: string, timetable_allocation_id: number) {
    this.id = id;
    this.slot_time = slot_time;
    this.timetable_allocation_id = timetable_allocation_id;
  }
}
