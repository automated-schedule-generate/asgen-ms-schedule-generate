import { TeacherEntity } from './';

export class PreferenceEntity {
  id: number;
  day: string;
  turn: string;
  teacher_id: number;

  teacher?: TeacherEntity;

  constructor(id: number, day: string, turn: string, teacher_id: number) {
    this.id = id;
    this.day = day;
    this.turn = turn;
    this.teacher_id = teacher_id;
  }
}
