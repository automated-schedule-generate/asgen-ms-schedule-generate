import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassModel, ClassroomModel, CourseModel, PreferenceModel, SubjectModel, TeacherModel } from '../models';

@Injectable()
export class CourseRepositoryImpl {
  constructor(
    @InjectModel(CourseModel)
    private readonly course: typeof CourseModel,
  ) {}

  async findAll(): Promise<CourseModel[]> {
    return this.course.findAll();
  }

  async findAllWithDeps(): Promise<CourseModel[]> {
    return this.course.findAll({
      include: [
        {
          model: SubjectModel,
          include: [{ model: TeacherModel, include: [{ model: PreferenceModel }] }],
        },
        { model: ClassModel },
        { model: ClassroomModel },
      ],
    });
  }
}
