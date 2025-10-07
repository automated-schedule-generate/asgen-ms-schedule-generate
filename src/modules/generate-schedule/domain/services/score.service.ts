import { Injectable } from '@nestjs/common';
import { SubjectEntity, ScheduleEntity, TimetableEntity } from '../entities';

@Injectable()
export class ScoreService {
  calculateScore(schedule: ScheduleEntity): number {
    let sum = 0;
    for (const timetable of schedule.timetables) {
      const results: number[] = [
        this.clustersElementPoints(timetable),
        this.teacherPreference(timetable),
        this.teacherConflits(timetable),
        this.roomConflits(timetable),
      ];

      const result = results.reduce((a, b) => a + b, 0) / results.length;
      sum += result;
    }
    return sum / schedule.timetables.length;
  }

  private clustersElementPoints(timetable: TimetableEntity) {
    let sum = 0;
    for (const schedule of timetable.schedule) {
      const groupElements = this.groupElements(schedule);
      const emptyElements = this.clustersELement(schedule, null);

      const result = (groupElements + emptyElements) / 2;
      sum += result;
    }
    return sum / timetable.schedule.length;
  }

  private groupElements(schedule: (SubjectEntity | null)[][]) {
    let points: number = 0;
    const subjects: SubjectEntity[] = schedule.flat().filter((v) => v !== null);
    for (const subject of subjects) {
      points += this.clustersELement(schedule, subject);
    }
    return points / subjects.length;
  }

  private clustersELement(schedule: (SubjectEntity | null)[][], value: SubjectEntity | null) {
    if (schedule.flat().filter((v) => v === value).length === 0) {
      throw new Error('Element not found');
    }

    let totalElements = 0;
    let elementsIsolated = 0;

    for (let row = 0; row < schedule.length; row++) {
      for (let col = 0; col < schedule[0].length; col++) {
        if (schedule[row][col] === value) {
          totalElements++;

          const isUpElement = row > 0 && schedule[row - 1][col] === value;
          const isDownElement = row < schedule.length - 1 && schedule[row + 1][col] === value;

          if (!isUpElement && !isDownElement) {
            elementsIsolated++;
          }
        }
      }
    }

    return (1 - elementsIsolated / totalElements) * 1000;
  }

  private teacherPreference(timetable: TimetableEntity) {
    if (timetable.teachers.length === 0) {
      throw new Error('No teachers found in timetable');
    }

    let sum = 0;

    for (const teacher of timetable.teachers) {
      if (teacher.preferences && teacher.preferences.length > 0) {
        let count = 0;
        for (const schedule of timetable.schedule) {
          count += teacher.preferencesBySchedule(schedule);
        }
        sum += count / teacher.preferences.length;
      }
    }
    return (sum / timetable.teachers.length) * 1000 || 0;
  }

  private teacherConflits(timetable: TimetableEntity) {
    // TODO: Implement teacher conflict scoring
    return 1000;
  }

  private roomConflits(timetable: TimetableEntity) {
    // TODO: Implement room conflict scoring
    return 1000;
  }
}
