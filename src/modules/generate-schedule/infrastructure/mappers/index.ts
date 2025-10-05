import { CourseMapper } from './course.mapper';
import { SemesterMapper } from './semester.mapper';
import { TeacherMapper } from './teacher.mapper';
import { AllocationTimeMapper } from './allocation-time.mapper';
import { ClassMapper } from './class.mapper';
import { ClassroomMapper } from './classroom.mapper';
import { PreferenceMapper } from './preference.mapper';
import { SubjectMapper } from './subject.mapper';
import { TimetableAllocationMapper } from './timetable-allocation.mapper';

const courseMapper = new CourseMapper();
const semesterMapper = new SemesterMapper();
const teacherMapper = new TeacherMapper();
const allocationTimeMapper = new AllocationTimeMapper();
const classMapper = new ClassMapper();
const classroomMapper = new ClassroomMapper();
const preferenceMapper = new PreferenceMapper();
const subjectMapper = new SubjectMapper();
const timetableAllocationMapper = new TimetableAllocationMapper();

export {
  courseMapper,
  semesterMapper,
  teacherMapper,
  allocationTimeMapper,
  classMapper,
  classroomMapper,
  preferenceMapper,
  subjectMapper,
  timetableAllocationMapper,
};
