import { BaseCollection } from '../collection';
import { Collection } from '../types/collection';
import { DatabaseProvider } from '../types/database';
import { PersistenceProvider } from '../types/persistence';
import { Model, ModelSchema } from '../types/schema';
import { logger } from '../util/logger';

export interface JsonDatabaseParameters {
    persistence: PersistenceProvider;
}

export class JsonDatabase implements DatabaseProvider {
    private persistence: PersistenceProvider;

    public constructor(params: JsonDatabaseParameters) {
        this.persistence = params.persistence;
    }

    public async addModel<T extends Model>(
        name: string,
        schema: ModelSchema<T>,
    ): Promise<Collection<T>> {
        const path = `${name}.json`;

        let data: T[];

        const dateKeys = Object.entries(schema)
            .filter((s) => s[1].kind === 'date')
            .map((s) => s[0]);

        const dateArrayKeys = Object.entries(schema)
            .filter((s) => s[1].kind === 'date[]')
            .map((s) => s[0]);

        try {
            const buffer = await this.persistence.load(path);
            data = JSON.parse(buffer.toString(), (key, value) => {
                if (dateKeys.includes(key)) {
                    return new Date(value);
                }
                if (dateArrayKeys.includes(key)) {
                    return value.map((str: string) => new Date(str));
                }
                return value;
            });
        } catch (e) {
            logger.error(e);
            data = [];
        }

        const collection = new BaseCollection<T>({
            persistence: this.persistence,
            name: path,
            schema,
            data,
        });

        return collection;
    }
}
