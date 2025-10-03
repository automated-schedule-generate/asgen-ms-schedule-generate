import { ITimetable } from '../interfaces';
import { CourseEntity } from './course.entity';
import { SubjectEntity } from './subject.entity';

export class ScheduleEntity {
  courses: CourseEntity[];
  timetables: ITimetable[];
  score: number = 0;

  constructor(courses: CourseEntity[]) {
    this.courses = courses;
    this.generateSchedule();
  }

  private generateSchedule() {
    for (const course of this.courses) {
      this.timetables.push(this.generateFirstTimetable(course));
    }
  }

  private generateFirstTimetable(course: CourseEntity): ITimetable {
    const schedule: (SubjectEntity | null)[][][] = [];
    for (let i = 0; i < course.total_semesters; i++) {
      const subjects: SubjectEntity[] = course.subjects?.filter((subject) => i + 1 === subject.course_semester) ?? [];

      const expandSubjects: SubjectEntity[] = this.expandedSubjects(subjects);
      schedule.push(this.mountSchedule(expandSubjects));
    }

    return {
      course,
      schedule,
    };
  }

  // para replicar as disciplinas de acordo com a carga horaria
  private expandedSubjects(subjects: SubjectEntity[]): SubjectEntity[] {
    const expanded: SubjectEntity[] = [];
    subjects.forEach((subject) => {
      const quantity = subject.workload / 15;
      for (let i = 0; i < quantity; i++) {
        expanded.push(subject);
      }
    });
    return expanded;
  }

  private mountSchedule(subjects: SubjectEntity[]): (SubjectEntity | null)[][] {
    const schedule: (SubjectEntity | null)[][] = [];
    let count = 0;

    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 6; row++) {
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
