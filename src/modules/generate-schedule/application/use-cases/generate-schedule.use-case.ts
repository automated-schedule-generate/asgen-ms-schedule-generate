import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/common/interfaces/use-case.interface';
import { IResponseSuccess } from 'src/common/interfaces/';
import { CourseRepositoryImpl } from '../../infrastructure/repositories/course.repository.impl';
import { courseMapper } from '../../infrastructure/mappers';
import { CourseEntity } from '../../domain/entities';
import { GeneticService } from '../../domain/services';

@Injectable()
export class GenerateScheduleUseCase implements IUseCase<IResponseSuccess<CourseEntity[]>> {
  constructor(
    private readonly courseRepository: CourseRepositoryImpl,
    private readonly geneticService: GeneticService,
  ) {}
  async execute(): Promise<IResponseSuccess<CourseEntity[]>> {
    if (this.geneticService.started) {
      return {
        statusCode: 200,
        message: 'schedule generation in processing',
        data: this.geneticService.public_courses.map((course) => ({
          ...course,
          subjects: undefined,
          classes: undefined,
          classrooms: undefined,
        })),
      };
    }
    const courses = await this.courseRepository.findAllWithSubjectsAndWithClasses();
    const data: CourseEntity[] = courses.map((course) => courseMapper.toEntity(course.dataValues)) ?? [];
    setTimeout(() => {
      this.geneticService.execute(data);
    }, 1);
    return {
      statusCode: 200,
      message: 'start of background schedule generation',
      data: data.map((course) => ({
        ...course,
        subjects: undefined,
        classes: undefined,
        classrooms: undefined,
      })),
    };
  }
}
