import type { CourseType } from '@/db/types/course';
import type { ClasseType } from '@/db/types/class';
import type { SubjectType } from '@/db/types/subject';
import fs from 'node:fs';
import { parse, stringify } from 'flatted';

const db = new Map();

export default db;

export { setValues, saveTimetables, loadTimetables, testSaveTimetables };

function setValues(courses: CourseType[]) {
	courses.forEach((course: CourseType) => {
		db.set(`course-${course.id}`, course);

		course.subjects.forEach((subject: SubjectType) => {
			subject.course = course;

			if (subject.prerequisite_id) {
				const prerequisite = db.get(`subject-${subject.prerequisite_id}`);
				if (prerequisite) {
					subject.prerequisite = prerequisite;
				}
			}
			subjectInClass(subject);
			db.set(`subject-${subject.id}`, subject);
		});

		course.classes.forEach((classe: ClasseType) => {
			classe.course = course;
			db.set(`class-${classe.id}`, classe);
		});
	});
}

async function subjectInClass(subject: SubjectType) {
	if (subject?.course) {
		subject.course.classes.forEach((classe: ClasseType) => {
			if (classe.course_semester === subject.course_semester) {
				if (!classe.subjects) {
					classe.subjects = [];
				}
				classe.subjects.push(subject);

				if (!subject.classes) {
					subject.classes = [];
				}
				subject.classes.push(classe);
			}
		});
	}
}

async function saveTimetables(timetables: CourseType[]) {
	const data: Partial<CourseType>[] = timetables.map(
		(timetable: CourseType): Partial<CourseType> => ({
			id: timetable.id,
			name: timetable.name,
			total_semesters: timetable.total_semesters,
			timetables: timetable.timetables,
			classes: timetable.classes,
		}),
	);
	fs.writeFileSync('timetables.json', stringify(data));
}

async function testSaveTimetables(courses: CourseType[]) {
	const data = courses.map((course) => ({
		id: course.id,
		classes: course.classes.map((classe, index) => ({
			id: classe.id,
			timetables: course?.timetables?.[index].map((timetable) =>
				timetable.map((subject) => {
					if (subject) {
						return {
							id: subject.id,
						};
					}
					return null;
				}),
			),
		})),
	}));

	fs.writeFileSync('teste.json', JSON.stringify(data));
}

async function loadTimetables() {
	return fs.readFileSync('timetables.json', 'utf-8');
}
