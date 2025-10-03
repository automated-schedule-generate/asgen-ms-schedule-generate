import { Injectable } from '@nestjs/common';
import { IGenetic } from '../types';
import { ScheduleEntity } from '../entities';

@Injectable()
export class NaturalSelectionService implements IGenetic<ScheduleEntity[]> {
  execute(schedule: ScheduleEntity[]): ScheduleEntity[] {
    const population = [...schedule].sort((a, b) => b.score - a.score);
    const response: ScheduleEntity[] = [];
    for (let i = 0; i < population.length / 2; i++) {
      response.push(population[i]);
    }
    return response;
  }
}
