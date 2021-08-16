import { JsonDatabaseBuilder } from './database/jsonDatabaseBuilder';
import { Model, ModelSchema } from './types/schema';
import { config } from './util';
import { logger } from './util/logger';

interface TestModel extends Model {
    id: string;
    numbers: number[];
}

(async () => {
    const db = await new JsonDatabaseBuilder({
        auth: config.GITHUB_PERSONAL_ACCESS_TOKEN,
        repo: config.GITHUB_REPO_NAME,
    }).build();

    const testSchema: ModelSchema<TestModel> = {
        id: {
            kind: 'string',
        },
        numbers: {
            kind: 'number[]',
        },
    };

    const users = await db.addModel('users', testSchema);

    const promises: Promise<TestModel>[] = [];

    for (let i = 0; i < 100; i += 1) {
        const promise = users.insert({
            id: `${i}`,
            numbers: [i],
        });
        promises.push(promise);
    }

    await Promise.all(promises);

    logger.info(await users.select(() => true));

    await users.saveChanges();
})().catch((e) => logger.error(e));
