import { CourseEntity, SubjectEntity } from './';

export class TimetableEntity {
  course: CourseEntity;
  schedule: (SubjectEntity | null)[][][];

  constructor(course: CourseEntity, schedule: (SubjectEntity | null)[][][]) {
    this.course = course;
    this.schedule = schedule;
  }
}
