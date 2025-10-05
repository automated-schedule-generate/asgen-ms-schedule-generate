import { SubjectEntity, TeacherEntity } from './';

export class SemesterEntity {
  id: number;
  age: number;
  semester: string;

  subjects?: SubjectEntity[];
  teachers?: TeacherEntity[];

  constructor(id: number, age: number, semester: string) {
    this.id = id;
    this.age = age;
    this.semester = semester;
  }
}
