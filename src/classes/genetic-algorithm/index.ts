import { IGeneticAlgorithm } from "@/classes/genetic-algorithm/interfaces/genetic-algorithm";
import validateTimetable from "@/classes/genetic-algorithm/validate-timetable";
import generateGenerations from "@/classes/genetic-algorithm/generate-generations";
import mixingRandomlySubjectsFromTheSemester from "@/classes/genetic-algorithm/mixing-randomly-subjects-from-the-semester";

export type {
    IGeneticAlgorithm,
}

export {
    validateTimetable,
    generateGenerations,
    mixingRandomlySubjectsFromTheSemester
}