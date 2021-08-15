import { ResponseHeaders } from '@octokit/types';
import { BaseCollection } from './collection/collection';
import { FileSystemPersistenceProvider } from './persistence/fileSystemPersistenceProvider';
import { JsonDatabase } from './database/jsonDatabase';
import { Model, ModelSchema } from './types/databaseProvider';

export type QueryPredicate<T> = (model: T) => boolean;

interface Result {
    id: string;
    num: number;
}

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

    // const model = await users.insert({
    //     created: new Date(),
    //     num: 123,
    // });

    // const results = await users.select((user) => user);
    // console.log(results);

    // await users.update(
    //     (model) => true,
    //     (user) => ({
    //         ...user,
    //         id: `${user.id}modified`,
    //     }),
    // );
})();
