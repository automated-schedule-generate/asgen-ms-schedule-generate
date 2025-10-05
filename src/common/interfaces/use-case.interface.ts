export interface IUseCase<type> {
  execute(): Promise<type>;
}
