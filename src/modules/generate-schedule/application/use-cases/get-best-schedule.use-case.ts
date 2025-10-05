import { IResponseSuccess, IUseCase } from 'src/common/interfaces';
import { ScheduleEntity } from '../../domain/entities';
import { GeneticService } from '../../domain/services';

export class GetBestScheduleUseCase implements IUseCase<IResponseSuccess<ScheduleEntity>> {
  constructor(private readonly geneticService: GeneticService) {}
  async execute(): Promise<IResponseSuccess<ScheduleEntity>> {
    return {
      statusCode: 200,
      message: 'best schedule',
      data: await Promise.resolve(this.geneticService.bestSchedule),
    };
  }
}
