import { ClassTimeEnum } from '../enums';
import { CourseEntity, SubjectEntity, TimetableEntity } from './';

export class ScheduleEntity {
  timetables: TimetableEntity[];
  score: number = 0;

  constructor(courses: CourseEntity[]) {
    this.generateSchedule(courses);
  }

  private generateSchedule(courses: CourseEntity[]): void {
    for (const course of courses) {
      this.timetables.push(this.generateFirstTimetable(course));
    }
  }

  private generateFirstTimetable(course: CourseEntity): TimetableEntity {
    const schedule: (SubjectEntity | null)[][][] = [];
    for (let i = 0; i < course.total_semesters; i++) {
      const subjects: SubjectEntity[] = course.subjects?.filter((subject) => i + 1 === subject.course_semester) ?? [];

      const expandSubjects: SubjectEntity[] = this.expandedSubjects(subjects, course.class_time);
      schedule.push(this.mountSchedule(expandSubjects, course.class_time));
    }

    return new TimetableEntity(course, schedule);
  }

  // para replicar as disciplinas de acordo com a carga horaria
  private expandedSubjects(subjects: SubjectEntity[], class_time: ClassTimeEnum): SubjectEntity[] {
    const expanded: SubjectEntity[] = [];
    let divider: number = 15;
    if (class_time === ClassTimeEnum.MIN45) {
      divider = 15;
    } else if (class_time === ClassTimeEnum.MIN60) {
      divider = 20;
    }
    subjects.forEach((subject) => {
      const quantity = subject.workload / divider;
      for (let i = 0; i < quantity; i++) {
        expanded.push(subject);
      }
    });
    return expanded;
  }

  private mountSchedule(subjects: SubjectEntity[], class_time: ClassTimeEnum): (SubjectEntity | null)[][] {
    const schedule: (SubjectEntity | null)[][] = [];
    let count = 0;
    let limit_row: number = 6;
    if (class_time === ClassTimeEnum.MIN45) {
      limit_row = 6;
    } else if (class_time === ClassTimeEnum.MIN60) {
      limit_row = 5;
    }

    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < limit_row; row++) {
        if (!schedule[row]) {
          schedule[row] = [];
        }
        if (count < subjects.length) {
          schedule[row][col] = subjects[count];
          count++;
        } else {
          schedule[row][col] = null;
        }
      }
    }

    return schedule;
  }
}
