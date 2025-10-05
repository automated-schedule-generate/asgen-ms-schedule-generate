import { ClassTimeEnum } from '../enums';
import { ClassEntity, ClassroomEntity, SubjectEntity } from './';

export class CourseEntity {
  id: number;
  name: string;
  total_semesters: number;
  class_time: ClassTimeEnum;

  subjects?: SubjectEntity[];
  classes?: ClassEntity[];
  classrooms?: ClassroomEntity[];

  constructor(id: number, name: string, total_semesters: number, class_time: ClassTimeEnum) {
    this.id = id;
    this.name = name;
    this.total_semesters = total_semesters;
    this.class_time = class_time;
  }
}
