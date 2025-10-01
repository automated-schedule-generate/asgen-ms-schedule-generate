export interface ResponseSuccess<T> {
  statusCode: number;
  message: string;
  data?: T;
}
