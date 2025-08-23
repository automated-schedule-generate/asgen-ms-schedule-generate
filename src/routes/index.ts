import app from '@/config/app';
import type { Request, Response } from 'express';
import { manyCourseSchema } from '@/validation/courseSchema';
import { loadTimetables } from '@/db';
import generateTimetable from '@/classes/generate-timetable';
import fs from 'node:fs';
import { stringify } from 'flatted';

export default function () {
	app.get('/', (req: Request, res: Response) => {
		res.json({
			message: 'Welcome to Timetable Generator microservice',
		});
	});

	app.get('/progress', async (req: Request, res: Response) => {
		let status = 'in_progress';
		const progress = generateTimetable.getProgress();
		if (progress === 100) {
			status = 'completed';
		}
		res.status(200).json({
			status,
			progress,
		});
	});

	app.post('/start', async (req: Request, res: Response) => {
		const data = req.body;
		const validate = manyCourseSchema.safeParse(data);

		if (!validate.success) {
			res.json({
				message: 'Invalid data',
				error: validate.error,
				data,
			});
			return;
		}

		res.status(200).json({
			message: 'Started generating timetables',
		});

		generateTimetable.start(data, 1000);
	});

	app.get('/temporary-timetables', async (req: Request, res: Response) => {
		res.json({
			timetables: await loadTimetables(),
		});
	});
}
