import { envData } from 'src/configuration/';

export interface IGenetic<response> {
  execute(...agrs: any): response;
}

export class GeneticCondition {
  public quantity: number = 0;
  public limitExecuted: number = Number(envData.limitExecuted ?? 0);

  constructor() {
    if (this.limitExecuted < 0) {
      this.limitExecuted = 0;
    }
  }
}
