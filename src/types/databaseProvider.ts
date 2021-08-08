export interface DatabaseProvider {
    addModel<T extends ModelSchema>(
        name: string,
        schema: T,
    ): Promise<Collection<T>>;
}

type SelectPredicate<T extends ModelSchema> = (model: Model<T>) => boolean;
type UpdateModelFunction<T extends ModelSchema> = (model: Model<T>) => Model<T>;

export interface Collection<T extends ModelSchema> {
    insert(model: Model<T>): Promise<Model<T>>;
    select(predicate: SelectPredicate<T>): Promise<Model<T>[]>;
    selectOne(predicate: SelectPredicate<T>): Promise<Model<T> | null>;
    update(
        predicate: SelectPredicate<T>,
        modifier: UpdateModelFunction<T>,
    ): Promise<Model<T>[]>;
    delete(predicate: SelectPredicate<T>): Promise<Model<T>[]>;
}

type PropertyType = 'string' | 'number' | 'date';

interface RequiredProperty<T> {
    default?: T;
    optional?: false;
}

interface OptionalProperty<T> {
    default?: T;
    optional: true;
}

type BaseProperty<TKind extends PropertyType, TType> = (
    | RequiredProperty<TType>
    | OptionalProperty<TType>
) & {
    kind: TKind;
};

export type StringType = BaseProperty<'string', string>;
export type NumberType = BaseProperty<'number', number>;
export type DateType = BaseProperty<'date', Date>;

export type ModelProperty = StringType | NumberType | DateType;

export interface ModelSchema {
    [x: string]: ModelProperty;
}

type MapKindToType<T extends PropertyType> = T extends 'string'
    ? string
    : T extends 'number'
    ? number
    : Date;

type Optional = { optional: true } | { default: string | number | Date };

type MapSchemaToModel<T extends ModelSchema> = {
    [K in keyof T]: T[K] extends Optional
        ? {
              [P in K]?: MapKindToType<T[K]['kind']>;
          }
        : {
              [P in K]: MapKindToType<T[K]['kind']>;
          };
};

type Flatten<T> = T[keyof T];

export type Model<T extends ModelSchema> = Flatten<MapSchemaToModel<T>>;
