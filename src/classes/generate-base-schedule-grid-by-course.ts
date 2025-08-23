import { CourseType } from '@/db/types/course';
import { SemesterType } from '@/db/types/semester';
import { SubjectType } from '@/db/types/subject';

export default new (class GenerateBaseScheduleGridByCourse {
	start(course: CourseType): SemesterType[] {
		const semesters: SemesterType[] = [];

		for (let i = 0; i < course.total_semesters; i++) {
			const semester_number = i + 1;
			const subjects: SubjectType[] = course.subjects.filter(
				(subject) => subject.course_semester === semester_number,
			);
			let expandSubjects: SubjectType[] = [];
			subjects.forEach((subject) => {
				const quantity = subject.workload / 15;
				for (let i = 0; i < quantity; i++) {
					expandSubjects.push(subject);
				}
			});
			semesters.push(this.#generateSemester(expandSubjects));
		}
		return semesters;
	}

	#generateSemester(subjects: SubjectType[]): SemesterType {
		const semester: SemesterType = [];
		let count = 0;

		for (let col = 0; col < 5; col++) {
			for (let row = 0; row < 6; row++) {
				if (!semester[row]) {
					semester[row] = [];
				}
				if (count < subjects.length) {
					semester[row][col] = subjects[count];
					count++;
				} else {
					semester[row][col] = null;
				}
			}
		}
		return semester;
	}
})();
