export type ModelPropertyType =
    | string
    | number
    | Date
    | boolean
    | string[]
    | number[]
    | Date[]
    | boolean[];

export type MapArrayTypeToKind<T extends ModelPropertyType[]> =
    T extends string[]
        ? 'string[]'
        : T extends number[]
        ? 'number[]'
        : T extends Date[]
        ? 'date[]'
        : T extends boolean[]
        ? 'boolean[]'
        : never;

export type MapTypeToKind<T extends ModelPropertyType> = T extends string
    ? 'string'
    : T extends number
    ? 'number'
    : T extends Date
    ? 'date'
    : T extends boolean
    ? 'boolean'
    : T extends Array<ModelPropertyType>
    ? MapArrayTypeToKind<T>
    : never;

export interface Model {
    [x: string]: ModelPropertyType;
}

export type ModelProperty<T extends ModelPropertyType> = {
    default?: T;
    optional?: boolean;
    kind: MapTypeToKind<T>;
};

export type ModelSchema<T extends Model> = {
    [K in keyof T]: ModelProperty<T[K]>;
};
