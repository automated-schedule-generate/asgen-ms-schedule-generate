import { Injectable } from '@nestjs/common';
import { IGenetic } from '../interfaces';
import { ScheduleEntity } from '../entities/';

@Injectable()
export class MutationService implements IGenetic<void> {
  execute(schedule: ScheduleEntity[]): void {}
}
