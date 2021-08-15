import { Collection } from './collection';
import { Model, ModelSchema } from './schema';

export interface DatabaseProvider {
    addModel<T extends Model>(
        name: string,
        schema: ModelSchema<T>,
    ): Promise<Collection<T>>;
}
