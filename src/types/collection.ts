import { Model } from './schema';

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
