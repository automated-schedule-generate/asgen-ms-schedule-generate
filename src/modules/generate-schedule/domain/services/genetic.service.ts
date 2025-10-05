import { Injectable } from '@nestjs/common';
import { CourseEntity, ScheduleEntity, GeneticConditionEntity } from '../entities';
import { ScoreService, MutationService, CrossoverService, NaturalSelectionService } from './';
import { IGenetic } from '../interfaces';
import { envData } from 'src/configuration';

@Injectable()
export class GeneticService implements IGenetic<void> {
  private courses: CourseEntity[] = [];
  private schedules: ScheduleEntity[] = [];
  public started: boolean = false;

  // quantidade maxima de execuções do algoritmo genetico
  private condition: GeneticConditionEntity = new GeneticConditionEntity();

  constructor(
    private readonly scoreService: ScoreService,
    private readonly mutationService: MutationService,
    private readonly crossoverService: CrossoverService,
    private readonly naturalSelectionService: NaturalSelectionService,
  ) {}

  public get public_courses(): CourseEntity[] {
    return this.courses;
  }

  execute(courses: CourseEntity[]): void {
    if (this.condition.quantity === 0) {
      this.courses = courses;
      this.started = true;
      if (this.condition.quantity === 0) {
        this.firstGeneration(courses);
      }

      while (true) {
        this.setScores();
        if (this.stop) {
          this.finish();
          return;
        }

        this.nextGeneration();

        this.condition.nextQuantity();
      }
    }
  }

  private nextGeneration(): void {
    const naturalSelectionPopulation: ScheduleEntity[] = this.naturalSelectionService.execute(this.schedules);
    const crossoverPopulation: ScheduleEntity[] = this.crossoverService.execute(naturalSelectionPopulation);
    const mutationPopulation: ScheduleEntity[] = this.mutationService.execute(crossoverPopulation);

    this.schedules = mutationPopulation;
  }

  private firstGeneration(courses: CourseEntity[]): void {
    this.schedules = [];
    for (let i = 0; i < 10; i++) {
      this.schedules.push(new ScheduleEntity(courses));
    }
  }

  private setScores(): void {
    for (const schedule of this.schedules) {
      schedule.score = this.scoreService.calculateScore(schedule);
    }
  }

  public get bestSchedule(): ScheduleEntity {
    let best: ScheduleEntity = this.schedules[0];
    for (const schedule of this.schedules) {
      if (schedule.score > best.score) {
        best = schedule;
      }
    }
    return best;
  }

  private get stop(): boolean {
    if (this.bestSchedule.score > 850) {
      return true;
    }
    if (this.condition.limitExecuted === 0) {
      return false;
    }
    return this.condition.quantity >= this.condition.limitExecuted;
  }

  private finish(): void {
    this.started = false;
    if (envData.mode === 'dev') {
      console.log(`Quantidade de execuções: ${this.condition.quantity}`);
    }
  }
}
