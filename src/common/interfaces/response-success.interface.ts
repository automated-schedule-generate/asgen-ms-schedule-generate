export interface IResponseSuccess<T> {
  statusCode: number;
  message: string;
  data?: T;
}
