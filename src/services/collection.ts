import { Collection, Model, ModelSchema } from '../types/databaseProvider';
import { PersistenceProvider } from '../types/persistenceProvider';

export interface CollectionParameters<T extends ModelSchema> {
    name: string;
    persistence: PersistenceProvider;
    schema: T;
    data: Model<T>[];
}

export class BaseCollection<T extends ModelSchema> implements Collection<T> {
    private name: string;
    private persistence: PersistenceProvider;
    private schema: ModelSchema;
    private data: Model<T>[];

    public constructor(params: CollectionParameters<T>) {
        this.name = params.name;
        this.persistence = params.persistence;
        this.schema = params.schema;
        this.data = params.data;
    }

    public async insert(model: Model<T>): Promise<Model<T>> {
        const copy = { ...model };

        // Check properties with defaults
        const defaults = Object.entries(this.schema)
            .filter((s) => s[1].default)
            .map((s) => [s[0], s[1].default]) as [
            keyof Model<T>,
            Model<T>[keyof Model<T>],
        ][];

        for (const [key, value] of defaults) {
            if (!model[key]) {
                copy[key] = value;
            }
        }

        // Check required properties
        const required = Object.entries(this.schema)
            .filter((s) => !s[1].optional)
            .map((s) => s[0]) as (keyof Model<T>)[];

        for (const key of required) {
            if (!copy[key]) {
                throw Error(
                    `Required property '${key}' has no value. Provide a value or specify a default in it's schema.`,
                );
            }
        }

        this.data.push(copy);
        await this.persistence.save(
            this.name,
            JSON.stringify(this.data, null, 2),
        );
        return copy;
    }

    public select(
        predicate: (model: Model<T>) => boolean,
    ): Promise<Model<T>[]> {
        return Promise.resolve(this.data.filter(predicate));
    }

    public selectOne(
        predicate: (model: Model<T>) => boolean,
    ): Promise<Model<T> | null> {
        return Promise.resolve(this.data.find(predicate) ?? null);
    }

    public update(
        predicate: (model: Model<T>) => boolean,
        modifier: (model: Model<T>) => Model<T>,
    ): Promise<Model<T>[]> {
        throw new Error('Method not implemented.');
    }

    public delete(
        predicate: (model: Model<T>) => boolean,
    ): Promise<Model<T>[]> {
        throw new Error('Method not implemented.');
    }
}
