import { Injectable } from '@nestjs/common';
import { IGenetic } from '../interfaces';
import { ScheduleEntity } from '../entities';

@Injectable()
export class CrossoverService implements IGenetic<void> {
  execute(schedule: ScheduleEntity[]): void {}
}
