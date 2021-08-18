import { JsonDatabase } from './jsonDatabase';
import { GitHubPersistenceProvider } from '../persistence/githubPersistenceProvider';
import { GitHubBuilder } from '../persistence/githubBuilder';
import { AbstractAsyncBuilder } from '../types/builder';

export interface JsonDatabaseBuilderOptions {
    auth: string;
    repo: string;
}

export class JsonDatabaseBuilder implements AbstractAsyncBuilder<JsonDatabase> {
    private options: JsonDatabaseBuilderOptions;

    public constructor(options: JsonDatabaseBuilderOptions) {
        this.options = options;
    }

    public async build(): Promise<JsonDatabase> {
        const github = await new GitHubBuilder({
            auth: this.options.auth,
        }).build();

        const persistence = new GitHubPersistenceProvider({
            github,
            repo: this.options.repo,
        });

        const db = new JsonDatabase({ persistence });

        return db;
    }
}
