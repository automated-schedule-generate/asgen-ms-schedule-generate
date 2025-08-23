import { ClasseType } from "@/db/types/class";
import { SubjectType } from "@/db/types/subject";
import {SemesterType} from "@/db/types/semester";

export type CourseType = {
    id: number,
    name: string,
    total_semesters: number,
    subjects: SubjectType[],
    classes: ClasseType[],
    timetables?: SemesterType[]
}