import { CourseType } from "@/db/types/course";
import { ClasseType } from "@/db/types/class";

export type SubjectType = {
    id: number,
    name: string,
    workload: number,
    is_optional: boolean,
    course_semester: number,
    prerequisite_id: number | null,
    prerequisite?: SubjectType,
    course_id: number,
    course?: CourseType,
    classes?: ClasseType[]
}