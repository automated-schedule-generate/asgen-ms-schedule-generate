import { Controller, Get, Post } from '@nestjs/common';
import { GenerateScheduleUseCase, GetBestScheduleUseCase } from '../../application/use-cases/';
import { Public } from 'src/common/decorators/';

@Controller('generate-schedule')
export class GenerateScheduleController {
  constructor(
    private readonly generateScheduleUseCase: GenerateScheduleUseCase,
    private readonly getBestScheduleUseCase: GetBestScheduleUseCase,
  ) {}

  // Remove public decorator for production
  @Public()
  @Post('start')
  async start() {
    return await this.generateScheduleUseCase.execute();
  }

  @Public()
  @Get('best-current-schedule')
  get() {
    return this.getBestScheduleUseCase.execute();
  }
}
