import { CourseEntity, TeacherEntity } from './';

export class SubjectEntity {
  id: number;
  name: string;
  workload: number;
  is_optional: boolean;
  course_semester: number;
  course_id: number;
  prerequisite_id?: number;

  course?: CourseEntity;
  prerequisite?: SubjectEntity;

  teachers?: TeacherEntity[];

  constructor(
    id: number,
    name: string,
    workload: number,
    is_optional: boolean,
    course_semester: number,
    course_id: number,
    prerequisite_id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.workload = workload;
    this.is_optional = is_optional;
    this.course_semester = course_semester;
    this.course_id = course_id;
    this.prerequisite_id = prerequisite_id;
  }
}
