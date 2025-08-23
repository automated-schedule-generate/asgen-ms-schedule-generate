import type { CourseType } from '@/db/types/course';
import Service from '@/services/Service';

export default class StoreTimetablesServices extends Service {
	constructor() {
		super();
	}

	async execute(courses: CourseType[]) {
		try {
			console.log('iniciado');
			await this.getApi().post('/api/timetable-generator', {
				data: courses.map((course) => ({
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
				})),
			});
			console.log('deu tudo certo');
		} catch (e) {
			console.log('deu tudo errado');
		}
	}
}

export const storeTimetablesServices = new StoreTimetablesServices();
