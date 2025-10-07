import { PreferenceDayEnum } from '../enums';
import { PreferenceEntity, SemesterEntity, SubjectEntity } from './';

export class TeacherEntity {
  user_id: number;
  workload: number;
  special_need: boolean;
  description_special_need?: string;
  observation?: string;

  subjects?: SubjectEntity[];
  semesters?: SemesterEntity[];
  preferences?: PreferenceEntity[];

  constructor(
    user_id: number,
    workload: number,
    special_need: boolean,
    description_special_need?: string,
    observation?: string,
  ) {
    this.user_id = user_id;
    this.workload = workload;
    this.special_need = special_need;
    this.description_special_need = description_special_need;
    this.observation = observation;
  }

  preferencesBySchedule(schedule: (SubjectEntity | null)[][]): number {
    if (this?.preferences && this.preferences.length <= 0) {
      return 1;
    }
    let count: number = 0;
    const matching_indices: { row: number; col: PreferenceDayEnum }[] = [];

    for (let row = 0; row < schedule.length; row++) {
      for (let col = 0; col < schedule[0].length; col++) {
        const subject = schedule[row][col];
        if (subject) {
          for (const teacher of subject?.teachers || []) {
            if (teacher.user_id === this.user_id) {
              matching_indices.push({ row, col });
              break;
            }
          }
        }
      }
    }

    for (const preference of this.preferences || []) {
      for (const index of matching_indices) {
        if (preference.day === index.col) {
          count++;
          break;
        }
      }
    }

    return count / Number(this.preferences?.length);
  }
}
