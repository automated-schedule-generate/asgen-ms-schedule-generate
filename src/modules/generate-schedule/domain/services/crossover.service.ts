import { Injectable } from '@nestjs/common';
import { IGenetic } from '../interfaces';
import { ScheduleEntity, TimetableEntity, SubjectEntity } from '../entities';

@Injectable()
export class CrossoverService implements IGenetic<ScheduleEntity[]> {
  execute(schedule: ScheduleEntity[]): ScheduleEntity[] {
    const response: ScheduleEntity[] = [...schedule];

    const combinations = this.getCombinations(schedule);
    for (const [schedule1, schedule2] of combinations) {
      response.push(this.generateMescledTimetable(schedule1, schedule2));
    }

    return response;
  }

  private generateMescledTimetable(schedule1: ScheduleEntity, schedule2: ScheduleEntity): ScheduleEntity {
    const childSchedule = new ScheduleEntity();

    for (let i = 0; i < schedule1.timetables.length; i++) {
      const parent1Timetable = schedule1.timetables[i];
      const parent2Timetable = schedule2.timetables[i];

      if (parent1Timetable.course.id === parent2Timetable.course.id) {
        const childTimetable = this.crossoverTimetable(parent1Timetable, parent2Timetable);
        childSchedule.timetables.push(childTimetable);
      }
    }

    return childSchedule;
  }
  private crossoverTimetable(parent1: TimetableEntity, parent2: TimetableEntity): TimetableEntity {
    const childSchedule: (SubjectEntity | null)[][][] = [];

    for (let semesterIdx = 0; semesterIdx < parent1.schedule.length; semesterIdx++) {
      const parent1Semester = parent1.schedule[semesterIdx];
      const parent2Semester = parent2.schedule[semesterIdx];

      const childSemester = this.crossoverSemester(parent1Semester, parent2Semester);
      childSchedule.push(childSemester);
    }

    return new TimetableEntity(parent1.course, childSchedule);
  }

  private crossoverSemester(
    parent1Semester: (SubjectEntity | null)[][],
    parent2Semester: (SubjectEntity | null)[][],
  ): (SubjectEntity | null)[][] {
    let childSemester: (SubjectEntity | null)[][];

    if (Math.random() < 0.5) {
      childSemester = parent1Semester.map((element) => [...element]);
    } else {
      childSemester = parent2Semester.map((element) => [...element]);
    }

    return childSemester;
  }

  private getCombinations(array: ScheduleEntity[]): [ScheduleEntity, ScheduleEntity][] {
    const result: [ScheduleEntity, ScheduleEntity][] = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        result.push([array[i], array[j]]);
      }
    }

    return result;
  }
}
