import { CourseEntity } from './';

export class ClassroomEntity {
  id: number;
  name: number;
  course_preference_id: number;

  course?: CourseEntity;

  constructor(id: number, name: number, course_preference_id: number) {
    this.id = id;
    this.name = name;
    this.course_preference_id = course_preference_id;
  }
}
