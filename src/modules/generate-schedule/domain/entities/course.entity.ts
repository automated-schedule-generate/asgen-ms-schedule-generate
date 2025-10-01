import { ClassEntity, ClassroomEntity, SubjectEntity } from './';

export class CourseEntity {
  id: number;
  name: string;
  total_semesters: number;

  subjects?: SubjectEntity[];
  classes?: ClassEntity[];
  classrooms?: ClassroomEntity[];

  constructor(id: number, name: string, total_semesters: number) {
    this.id = id;
    this.name = name;
    this.total_semesters = total_semesters;
  }
}
