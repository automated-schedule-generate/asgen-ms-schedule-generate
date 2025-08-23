import { z } from 'zod';
import { manyClassSchema } from '@/validation/classSchema';

const subjectSchema = z.object({
	id: z.number(),
	name: z.string(),
	workload: z.number(),
	is_optional: z.boolean().or(z.number()),
	course_semester: z.number(),
	prerequisite_id: z.number().nullable(),
	course_id: z.number(),
	classes: manyClassSchema.optional(),
});

export default subjectSchema;
export const manySubjectSchema = z.array(subjectSchema);
