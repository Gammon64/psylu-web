export type FieldError = { errors: string[] };

export type ErrorProperties<T> = {
  [K in keyof T]?: FieldError;
};

export type DefaultState<T> = T & {
  success?: boolean;
  error?: {
    errors: string[];
    properties?: ErrorProperties<T>;
  };
};
