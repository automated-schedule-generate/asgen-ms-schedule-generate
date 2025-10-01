import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/common/interfaces/use-case.interface';
import { ResponseSuccess } from 'src/common/interfaces/response-success.interface';
import { CourseRepositoryImpl } from '../../infrastructure/repositories/course.repository.impl';
import { courseMapper } from '../../infrastructure/mappers';
import { CourseEntity } from '../../domain/entities';
import { GeneticService } from '../../domain/services';

@Injectable()
export class GenerateScheduleUseCase implements IUseCase<ResponseSuccess<CourseEntity[]>> {
  constructor(
    private readonly courseRepository: CourseRepositoryImpl,
    private readonly geneticService: GeneticService,
  ) {}
  async execute(): Promise<ResponseSuccess<CourseEntity[]>> {
    const courses = await this.courseRepository.findAllWithSubjectsAndWithClasses();
    const data: CourseEntity[] = courses.map((course) => courseMapper.toEntity(course.dataValues)) ?? [];
    setTimeout(() => {
      this.geneticService.execute(data);
    }, 10);
    return {
      statusCode: 200,
      message: 'Schedule generated successfully',
      data,
    };
  }
}
