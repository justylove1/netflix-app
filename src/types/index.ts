export interface RawRequestAPI<T> {
  error: boolean;
  message: string;
  code: number;
  data: T;
}
