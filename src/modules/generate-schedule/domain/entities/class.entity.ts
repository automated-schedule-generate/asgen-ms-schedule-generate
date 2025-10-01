import { CourseEntity } from './';

export class ClassEntity {
  id: number;
  turn: string;
  course_semester: number;
  course_id: number;
  semester_id: number;

  course: CourseEntity;

  constructor(id: number, turn: string, course_semester: number, course_id: number, semester_id: number) {
    this.id = id;
    this.turn = turn;
    this.course_semester = course_semester;
    this.course_id = course_id;
    this.semester_id = semester_id;
  }
}
