import {
    Collection,
    QueryPredicate,
    UpdateFunction,
} from '../types/collection';
import { PersistenceProvider } from '../types/persistence';
import { Model, ModelSchema } from '../types/schema';

export interface CollectionParameters<T extends Model> {
    name: string;
    persistence: PersistenceProvider;
    schema: ModelSchema<T>;
    data: T[];
}

export class BaseCollection<T extends Model> implements Collection<T> {
    private name: string;
    private persistence: PersistenceProvider;
    private schema: ModelSchema<T>;
    private data: T[];

    public constructor(params: CollectionParameters<T>) {
        this.name = params.name;
        this.persistence = params.persistence;
        this.schema = params.schema;
        this.data = params.data;
    }

    public async saveChanges(): Promise<void> {
        await this.persistence.save(
            this.name,
            JSON.stringify(this.data, null, 2),
        );
    }

    public async insert(model: T): Promise<T> {
        const copy = { ...model };

        // Check properties with defaults
        const defaults = Object.entries(this.schema)
            .filter((s) => s[1].default)
            .map((s) => [s[0], s[1].default]) as [keyof T, T[keyof T]][];

        for (const [key, value] of defaults) {
            if (!model[key]) {
                copy[key] = value;
            }
        }

        // Check required properties
        const required = Object.entries(this.schema)
            .filter((s) => !s[1].optional)
            .map((s) => s[0]) as (keyof T)[];

        for (const key of required) {
            if (!copy[key]) {
                throw Error(
                    `Required property '${key}' has no value. Provide a value or specify a default in it's schema.`,
                );
            }
        }

        this.data.push(copy);
        return copy;
    }

    public select(predicate: QueryPredicate<T>): Promise<T[]> {
        return Promise.resolve(this.data.filter(predicate));
    }

    public selectOne(predicate: QueryPredicate<T>): Promise<T | null> {
        return Promise.resolve(this.data.find(predicate) ?? null);
    }

    public async update(
        predicate: QueryPredicate<T>,
        modifier: UpdateFunction<T>,
    ): Promise<void> {
        const items = this.data.filter(predicate);
        this.data = this.data.filter((model) => !predicate(model));

        const modified = items.map(modifier);
        this.data = [...this.data, ...modified];
    }

    public async delete(predicate: QueryPredicate<T>): Promise<void> {
        this.data = this.data.filter((model) => !predicate(model));
    }
}
