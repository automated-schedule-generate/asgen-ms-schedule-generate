import { ClassEntity, SemesterEntity, SubjectEntity } from './';

export class TimetableAllocationEntity {
  id: number;
  day: string;
  class_id: number;
  subject_id: number;

  class?: ClassEntity;
  subject?: SubjectEntity;
  semester?: SemesterEntity;

  constructor(id: number, day: string, class_id: number, subject_id: number) {
    this.id = id;
    this.day = day;
    this.class_id = class_id;
    this.subject_id = subject_id;
  }
}
