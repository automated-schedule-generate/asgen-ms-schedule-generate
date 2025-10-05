import { Injectable } from '@nestjs/common';
import { IGenetic } from '../interfaces';
import { ScheduleEntity } from '../entities';

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
    return schedule1; // TODO: implementar crossover
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
