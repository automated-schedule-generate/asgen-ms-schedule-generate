import { Injectable } from '@nestjs/common';
import { IGenetic } from '../interfaces';
import { ScheduleEntity } from '../entities';

@Injectable()
export class NaturalSelectionService implements IGenetic<ScheduleEntity[]> {
  execute(schedule: ScheduleEntity[]): ScheduleEntity[] {
    const population = [...schedule];

    return population;
  }
}
