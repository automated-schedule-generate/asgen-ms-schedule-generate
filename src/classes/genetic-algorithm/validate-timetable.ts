import { SemesterType } from "@/db/types/semester";
import { SubjectType } from "@/db/types/subject";
import {IGeneticAlgorithm} from "@/classes/genetic-algorithm/interfaces/genetic-algorithm";

export default new class ValidateTimetable implements IGeneticAlgorithm {
    start(semesters: SemesterType[]): number {
        let sum: number = 0;

        for(const semester of semesters) {
            if(semester.length === 0 || semester.flat().filter(value => value !== null).length === 0) {
                continue;
            }

            const groupSubjects: number = this.#groupSubjects(semester);
            const emptyClusters: number = this.#elementClusters(semester, null);
            const teachersPreference: number = this.#teachersPreference(semester);

            console.table({
                "groupSubjects": groupSubjects,
                "emptyClusters": emptyClusters,
                "teachersPreference": teachersPreference,
            });

            const result = (groupSubjects + emptyClusters + teachersPreference) / 3;
            sum += result;
        }

        return sum / semesters.length;
    }

    #groupSubjects(timetable: SemesterType): number {
        let points: number = 0;

        const objects = new Set<SubjectType>();
        timetable.flat().forEach((value: SubjectType | null) => {
            if(value !== null) {
                objects.add(value);
            }
        });
        const subjects: SubjectType[] = Array.from(objects);

        for(const subject of subjects) {
            points += this.#elementClusters(timetable, subject);
        }

        return points / subjects.length;
    }

    #teachersPreference(timetable: SemesterType): number {
        return 10;
    }

    #elementClusters(timetable: SemesterType, subject: SubjectType | null): number {
        //verifica se existe algum valor na grade de horario
        if(timetable.flat().filter(value => value === subject).length === 0) {
            return 10;
        }

        let totalElements = 0;
        let elementsIsolated = 0;

        for (let row = 0; row < timetable.length; row++) {
            for (let col = 0; col < timetable[0].length; col++) {
                if (timetable[row][col] === subject) {
                    totalElements++;

                    const isUpElement = row > 0 && timetable[row - 1][col] === subject;
                    const isDownElement = row < timetable.length - 1 && timetable[row + 1][col] === subject;

                    if (!isUpElement && !isDownElement) {
                        elementsIsolated++;
                    }
                }
            }
        }

        return (1 - elementsIsolated / totalElements) * 10;
    }
}