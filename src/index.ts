import { FileSystemPersistenceProvider } from './services/fileSystemPersistenceProvider';
import { JsonDatabase } from './services/jsonDatabase';

(async () => {
    const persistence = new FileSystemPersistenceProvider();

    const buffer = Buffer.from('Hello World!');

    persistence.save('temp/test', buffer);

    const db = new JsonDatabase({ persistence });

    const schema = {
        id: {
            kind: 'string',
            default: 'default text',
        },
        created: {
            kind: 'date',
        },
        num: {
            kind: 'number',
        },
    } as const;

    const users = await db.addModel('users', schema);

    const model = await users.insert({
        created: new Date(),
        num: 123,
    });

    const results = await users.select((user) => true);
    console.log(results);
})();
