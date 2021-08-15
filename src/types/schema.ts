export type ModelPropertyType = string | number | Date;

export type MapTypeToKind<T extends ModelPropertyType> = T extends string
    ? 'string'
    : T extends number
    ? 'number'
    : 'date';

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
