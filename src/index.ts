import { JsonDatabase } from './database/jsonDatabase';
import { FileSystemPersistenceProvider } from './persistence/fileSystemPersistenceProvider';
import { Model, ModelSchema } from './types/schema';

export type QueryPredicate<T> = (model: T) => boolean;

interface TestModel extends Model {
    str: string;
    num: number;
    date: Date;
}

(async () => {
    const persistence = new FileSystemPersistenceProvider();

    const db = new JsonDatabase({ persistence });

    const testSchema: ModelSchema<TestModel> = {
        str: {
            kind: 'string',
        },
        num: {
            kind: 'number',
        },
        date: {
            kind: 'date',
        },
    };

    const users = await db.addModel('users', testSchema);
    const results = await users.select((u) => u.str === '123');
    console.log(results);
})();
