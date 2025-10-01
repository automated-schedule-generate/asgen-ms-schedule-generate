import { classMapper, classroomMapper, subjectMapper } from './';
import { CourseEntity } from '../../domain/entities';
import { IMapper } from '../../domain/interfaces';
import { CourseModel } from '../models';

export class CourseMapper implements IMapper<CourseEntity, CourseModel> {
  toEntity(courseModel: CourseModel): CourseEntity {
    const courseEntity = new CourseEntity(courseModel.id, courseModel.name, courseModel.total_semesters);
    if (courseModel?.subjects) {
      courseEntity.subjects = courseModel.subjects.map((subjectModel) =>
        subjectMapper.toEntity(subjectModel.dataValues),
      );
    }
    if (courseModel?.classes) {
      courseEntity.classes = courseModel.classes.map((classModel) => classMapper.toEntity(classModel.dataValues));
    }
    if (courseModel?.classrooms) {
      courseEntity.classrooms = courseModel.classrooms.map((classroomModel) =>
        classroomMapper.toEntity(classroomModel.dataValues),
      );
    }
    return courseEntity;
  }
}
