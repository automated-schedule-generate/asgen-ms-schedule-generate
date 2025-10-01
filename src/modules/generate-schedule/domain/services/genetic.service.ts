import { Injectable } from '@nestjs/common';
import { CourseEntity, ScheduleEntity } from '../entities';
import { ScoreService, MutationService, CrossoverService, NaturalSelectionService } from './';
import { IGenetic } from '../interfaces';
import process from 'node:process';
import config from 'src/configuration/config';

@Injectable()
export class GeneticService implements IGenetic<void> {
  private schedules: ScheduleEntity[] = [];

  // quantidade maxima de execuções do algoritmo genetico
  private condition = {
    quantity: 0,
    limitExecuted: Number(process.env.LIMIT_EXECUTED ?? 0),
  };

  constructor(
    private readonly scoreService: ScoreService,
    private readonly mutationService: MutationService,
    private readonly crossoverService: CrossoverService,
    private readonly naturalSelectionService: NaturalSelectionService,
  ) {
    if (this.condition.limitExecuted < 0) {
      this.condition.limitExecuted = 0;
    }
  }

  execute(courses: CourseEntity[]) {
    if (this.condition.quantity === 0) {
      this.firstGeneration(courses);
    }
    this.nextGeneration();
  }

  private nextGeneration() {
    this.setScores();
    if (this.stop) {
      this.finish();
      return;
    }

    const newPopulation: ScheduleEntity[] = this.naturalSelectionService.execute(this.schedules);
    this.crossoverService.execute(newPopulation);
    this.mutationService.execute(newPopulation);

    this.schedules = newPopulation;

    this.condition.quantity++;

    setTimeout(() => {
      this.nextGeneration();
    }, 1);
  }

  private firstGeneration(courses: CourseEntity[]) {
    for (let i = 0; i < 10; i++) {
      this.schedules.push(new ScheduleEntity(courses));
    }
  }

  private setScores() {
    for (const schedule of this.schedules) {
      schedule.score = this.scoreService.calculateScore(schedule);
    }
  }

  private get bestSchedule(): ScheduleEntity {
    let best: ScheduleEntity = this.schedules[0];
    for (const schedule of this.schedules) {
      if (schedule.score > best.score) {
        best = schedule;
      }
    }
    return best;
  }

  private get stop() {
    if (this.bestSchedule.score > 850) {
      if (config.mode === 'dev') {
        console.log(`Quantidade de execuções: ${this.condition.quantity}`);
      }
      return true;
    }
    if (this.condition.limitExecuted === 0) {
      return false;
    }
    return this.condition.quantity >= this.condition.limitExecuted;
  }

  private finish() {}
}
