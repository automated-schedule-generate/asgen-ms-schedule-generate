import { Injectable } from '@nestjs/common';
import { IGenetic } from '../interfaces';
import { ScheduleEntity, SubjectEntity, TimetableEntity } from '../entities/';

@Injectable()
export class MutationService implements IGenetic<ScheduleEntity[]> {
  execute(schedule: ScheduleEntity[]): ScheduleEntity[] {
    const response: ScheduleEntity[] = [...schedule];

    for (let i = 0; i < response.length; i++) {
      for (let j = 0; j < response[i].timetables.length; j++) {
        response[i].timetables[j] = this.mutateTimetable(response[i].timetables[j]);
      }
    }

    return response;
  }

  private mutateTimetable(timetable: TimetableEntity): TimetableEntity {
    let schedule = [...timetable.schedule];
    const quantityOfMutations = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < quantityOfMutations; i++) {
      const mutationType = Math.floor(Math.random() * 2);

      if (mutationType === 0) {
        schedule = schedule.map((value) => this.randomizeColumns([...value]));
      }

      if (mutationType === 1) {
        schedule = schedule.map((value) => this.randomizeRows([...value]));
      }
    }
    timetable.schedule = schedule;
    return timetable;
  }

  // embaralha os elementos de cada coluna
  private randomizeColumns(schedule: (SubjectEntity | null)[][]): (SubjectEntity | null)[][] {
    const numRows = schedule.length;
    const numCols = schedule[0].length;

    const cols = Array.from({ length: numCols }, (_, colIndex) => schedule.map((row) => row[colIndex]));

    const shuffledCols = cols.map((col) => {
      const newCol = [...col];
      for (let i = newCol.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newCol[i], newCol[j]] = [newCol[j], newCol[i]];
      }
      return newCol;
    });

    const shuffledSchedule = Array.from({ length: numRows }, (_, rowIndex) => shuffledCols.map((col) => col[rowIndex]));

    return shuffledSchedule;
  }

  // embaralha os elementos de cada linha
  private randomizeRows(schedule: (SubjectEntity | null)[][]): (SubjectEntity | null)[][] {
    const shuflledSchedule = schedule.map((row) => {
      const newRow = [...row];
      for (let i = newRow.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newRow[i], newRow[j]] = [newRow[j], newRow[i]];
      }
      return newRow;
    });

    return shuflledSchedule;
  }
}
