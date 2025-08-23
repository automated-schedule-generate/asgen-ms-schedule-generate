import { CourseType } from "@/db/types/course";
import { SubjectType } from "@/db/types/subject";

export type ClasseType = {
    id?: number,
    turn: 'matutino' | 'vespertino' | 'noturno',
    course_semester: number,
    course_id: number,
    course?: CourseType,
    subjects?: SubjectType[],
}