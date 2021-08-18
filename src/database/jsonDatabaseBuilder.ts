import { JsonDatabase } from './jsonDatabase';
import { GitHubPersistenceProvider } from '../persistence/githubPersistenceProvider';
import { GitHubBuilder } from '../persistence/githubBuilder';
import { AbstractAsyncBuilder } from '../types/builder';

export interface JsonDatabaseBuilderOptions {
    /**
     * GitHub personal access token.
     *
     * The token should have the appropriate scopes for the repository you want to
     * use, e.g. `public_repo` if you want to use a public repository, and `repo` if
     * you want to use a private repository.
     * */
    auth: string;

    /**
     * Name of the the GitHub repository you want to use. A repository with this name
     * will be created if it doesn't exist.
     */
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
