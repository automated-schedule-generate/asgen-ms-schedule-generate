import { Injectable } from '@nestjs/common';
import { IGenetic } from '../interfaces';
import { ScheduleEntity } from '../entities';

@Injectable()
export class CrossoverService implements IGenetic<ScheduleEntity[]> {
  execute(schedule: ScheduleEntity[]): ScheduleEntity[] {
    const response: ScheduleEntity[] = [...schedule];

    return response;
  }
}
