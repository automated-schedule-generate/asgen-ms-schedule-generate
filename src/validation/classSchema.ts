import { z } from 'zod';

const classSchema = z.object({
	id: z.number(),
	turn: z.string(),
	course_semester: z.number(),
	course_id: z.number(),
});

export default classSchema;
export const manyClassSchema = z.array(classSchema);
