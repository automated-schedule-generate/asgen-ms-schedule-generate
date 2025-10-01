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
}
