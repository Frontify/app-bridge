/* (c) Copyright Frontify Ltd., all rights reserved. */

declare type Nullable<T> = T | null;

declare type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S;

declare type CamelKeysToSnakeCase<T> = T extends object
    ? {
          [K in keyof T as CamelToSnakeCase<K & string>]: T[K];
      }
    : T;
