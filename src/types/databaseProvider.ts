export interface DatabaseProvider {
    addModel<T extends Model>(
        name: string,
        schema: ModelSchema<T>,
    ): Promise<Collection<T>>;
}

export type QueryPredicate<T> = (model: T) => boolean;
export type UpdateFunction<T> = (model: T) => T;

export interface Collection<T extends Model> {
    insert(model: T): Promise<T>;
    select(predicate: QueryPredicate<T>): Promise<T[]>;
    selectOne(predicate: QueryPredicate<T>): Promise<T | null>;
    update(
        predicate: QueryPredicate<T>,
        modifier: UpdateFunction<T>,
    ): Promise<void>;
    delete(predicate: QueryPredicate<T>): Promise<void>;
}

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

// type PropertyType = 'string' | 'number' | 'date';

// interface RequiredProperty<T> {
//     // default?: T;
//     optional?: false;
// }

// interface OptionalProperty<T> {
//     // default?: T;
//     optional: true;
// }

// type BaseProperty<TKind extends PropertyType, TType> = (
//     | RequiredProperty<TType>
//     | OptionalProperty<TType>
// ) & {
//     kind: TKind;
// };

// export type StringType = BaseProperty<'string', string>;
// export type NumberType = BaseProperty<'number', number>;
// // export type DateType = BaseProperty<'date', Date>;

// export type ModelProperty = StringType | NumberType;
// // export type ModelProperty = StringType | NumberType | DateType;

// export interface ModelSchema {
//     [x: string]: ModelProperty;
// }

// type MapKindToType<T extends PropertyType> = T extends 'string'
//     ? string
//     : number;

// type Optional = { optional: true };

// type MapSchemaToModel<T extends ModelSchema> = {
//     [K in keyof T]: T[K] extends { optional: true }
//         ? {
//               [P in K]?: MapKindToType<T[K]['kind']>;
//           }
//         : {
//               [P in K]: MapKindToType<T[K]['kind']>;
//           };
// };

// type Flatten<T> = T[keyof T];

// export type Model<T extends ModelSchema> = Flatten<MapSchemaToT>;
