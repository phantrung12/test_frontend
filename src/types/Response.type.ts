export type IFilterParams = {
  query?: string;
  page?: number;
  size?: number;
  sort?: string[];
};

export interface EntityState<T> {
  loading: boolean;
  errorMessage: string | null;
  entities: ReadonlyArray<T>;
  entity: T;
  links?: any;
  updating: boolean;
  totalItems?: number;
  updateSuccess: boolean;
}
