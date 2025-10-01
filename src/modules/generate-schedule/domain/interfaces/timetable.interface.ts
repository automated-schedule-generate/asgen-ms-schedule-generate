import { CourseEntity, SubjectEntity } from '../entities';

export interface ITimetable {
  course: CourseEntity;
  schedule: (SubjectEntity | null)[][][];
}
