import { Module } from '@nestjs/common';
import { GenerateScheduleController } from './infrastructure/controllers/';
import {
  CrossoverService,
  MutationService,
  NaturalSelectionService,
  GeneticService,
  ScoreService,
} from './domain/services';
import { GenerateScheduleUseCase, GetBestScheduleUseCase } from './application/use-cases';
import {
  CourseRepositoryImpl,
  TeacherRepositoryImpl,
  SubjectRepositoryImpl,
  TimetableRepositoryImpl,
  ClassroomRepositoryImpl,
} from './infrastructure/repositories';
import { DatabaseModule } from '../database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  AllocationTimeModel,
  ClassModel,
  ClassroomModel,
  CourseModel,
  PreferenceModel,
  SemesterModel,
  SubjectModel,
  SubjectTeacherModel,
  TeacherModel,
  TimetableAllocationModel,
} from './infrastructure/models';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([
      CourseModel,
      SemesterModel,
      TeacherModel,
      AllocationTimeModel,
      ClassModel,
      ClassroomModel,
      PreferenceModel,
      SubjectModel,
      SubjectTeacherModel,
      TimetableAllocationModel,
    ]),
  ],
  controllers: [GenerateScheduleController],
  providers: [
    CrossoverService,
    MutationService,
    NaturalSelectionService,
    GeneticService,
    ScoreService,
    GenerateScheduleUseCase,
    GetBestScheduleUseCase,
    CourseRepositoryImpl,
    ClassroomRepositoryImpl,
    TeacherRepositoryImpl,
    SubjectRepositoryImpl,
    TimetableRepositoryImpl,
  ],
  exports: [],
})
export class GenerateScheduleModule {}
