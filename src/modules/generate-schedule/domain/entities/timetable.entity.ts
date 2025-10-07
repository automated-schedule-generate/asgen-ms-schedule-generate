import { CachedGetters } from 'src/common/decorators';
import { CourseEntity, SubjectEntity, TeacherEntity } from './';

export class TimetableEntity {
  course: CourseEntity;
  schedule: (SubjectEntity | null)[][][];

  constructor(course: CourseEntity, schedule: (SubjectEntity | null)[][][]) {
    this.course = course;
    this.schedule = schedule;
  }

  @CachedGetters()
  public get teachers(): TeacherEntity[] {
    const teachers: TeacherEntity[] = [];
    if (this.course?.subjects && this.course.subjects.length > 0) {
      for (const subject of this.course.subjects) {
        if (subject?.teachers && subject.teachers.length > 0) {
          for (const teacher of subject.teachers) {
            teachers.push(teacher);
          }
        }
      }
    }
    return teachers;
  }
}
