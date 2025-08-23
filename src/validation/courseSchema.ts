import { z } from 'zod';
import { manyClassSchema } from '@/validation/classSchema';
import { manySubjectSchema } from '@/validation/subjectSchema';

const courseSchema = z.object({
	id: z.number(),
	name: z.string(),
	total_semesters: z.number(),
	classes: manyClassSchema,
	subjects: manySubjectSchema,
});

export default courseSchema;
export const manyCourseSchema = z.array(courseSchema);
