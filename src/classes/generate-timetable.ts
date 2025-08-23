import { CourseType } from '@/db/types/course';
import GenerateBaseScheduleGridByCourse from '@/classes/generate-base-schedule-grid-by-course';
import { saveTimetables, setValues } from '@/db';
import io from '@/config/socketServer';
import { storeTimetablesServices } from '@/services/storeTimetablesServices';

export default new (class GenerateTimetable {
	#progress: number = 0;

	async start(data: CourseType[], number_of_simulations: number = 0) {
		if (number_of_simulations < 0) {
			throw new Error('Number of simulations must be greater than 0');
		}

		// setValues(data);

		this.#progress = 0;
		const nextProgress: number =
			number_of_simulations === 0 ? 100 : 100 / number_of_simulations;

		for (const course of data) {
			course.timetables = GenerateBaseScheduleGridByCourse.start(course);
		}
		await saveTimetables(data);
		this.setProgress(this.getProgress() + nextProgress);
		if (number_of_simulations > 1) {
			while (this.getProgress() < 100) {
				this.setProgress(this.getProgress() + nextProgress);
			}
		}

		storeTimetablesServices.execute(data);
	}

	getProgress(): number {
		return this.#progress;
	}
	setProgress(progress: number) {
		this.#progress = progress;
		this.#adjustmentInProgressWhen100Percent();
		this.#sendProgress();
	}

	//calculo do nextProgress tende a passar de 100 por conta de alguns quebrados!
	async #adjustmentInProgressWhen100Percent() {
		if (this.#progress >= 100) {
			this.#progress = 100;
		}
	}

	async #sendProgress() {
		io.emit('progress', {
			progress: this.#progress,
		});
	}
})();
