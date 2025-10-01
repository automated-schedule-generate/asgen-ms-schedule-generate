import { Controller, Post } from '@nestjs/common';
import { GenerateScheduleUseCase } from '../../application/use-cases/generate-schedule.use-case';
import { Public } from 'src/common/decorators/set-metadata.decorator';

@Controller('generate-schedule')
export class GenerateScheduleController {
  constructor(private readonly generateScheduleUseCase: GenerateScheduleUseCase) {}

  @Public()
  @Post('start')
  async start() {
    return await this.generateScheduleUseCase.execute();
  }
}
