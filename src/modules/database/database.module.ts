import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  AllocationTimeModel,
  ClassModel,
  ClassroomModel,
  CourseModel,
  PreferenceModel,
  SemesterModel,
  SubjectModel,
  TeacherModel,
  SubjectTeacherModel,
  TimetableAllocationModel,
} from 'src/modules/generate-schedule/infrastructure/models';
import process from 'node:process';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [
        TeacherModel,
        AllocationTimeModel,
        ClassModel,
        ClassroomModel,
        CourseModel,
        PreferenceModel,
        SemesterModel,
        SubjectTeacherModel,
        SubjectModel,
        TimetableAllocationModel,
      ],
      autoLoadModels: true,
      logging: false,
      synchronize: true,
    }),
  ],
  providers: [],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
