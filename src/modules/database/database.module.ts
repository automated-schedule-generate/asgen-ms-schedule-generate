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
import { envData } from 'src/configuration';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: envData.database.host,
      port: Number(envData.database.port ?? 5432),
      username: envData.database.user,
      password: envData.database.pass,
      database: envData.database.name,
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
