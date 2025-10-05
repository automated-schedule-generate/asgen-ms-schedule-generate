import { envData } from 'src/configuration/';

export class GeneticConditionEntity {
  #quantity: number = 0;
  #limitExecuted: number = Number(envData.limitExecuted ?? 0);

  constructor() {
    if (this.#limitExecuted < 0) {
      this.#limitExecuted = 0;
    }
  }

  get quantity(): number {
    return this.#quantity;
  }

  get limitExecuted(): number {
    return this.#limitExecuted;
  }

  public nextQuantity(): void {
    this.#quantity++;
  }

  public resetQuantity(): void {
    this.#quantity = 0;
  }
}
