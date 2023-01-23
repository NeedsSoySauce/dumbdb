import { GitHub } from './github';
import { PersistenceProvider } from '../types/persistence';
import { Mutex } from '../synchronization/mutex';
import { Lock } from '../types/mutex';

export interface GitHubPersistenceProviderOptions {
    github: GitHub;
    repo: string;
    mutex?: Lock;
}

export class GitHubPersistenceProvider implements PersistenceProvider {
    private github: GitHub;
    private repo: string;
    private mutex: Lock;

    public constructor(params: GitHubPersistenceProviderOptions) {
        this.github = params.github;
        this.repo = params.repo;
        this.mutex = new Mutex();
    }

    public async save(path: string, content: string | Uint8Array): Promise<void> {
        const buffer =
            typeof content === 'string' ? new TextEncoder().encode(content) : content;

        await this.mutex.runExclusive(async () => {
            const result = await this.github.UploadOrUpdateFile({
                content: buffer,
                path,
                repo: this.repo,
            });
            return Promise.resolve(result);
        });
    }

    public async load(path: string): Promise<Uint8Array> {
        const file = await this.github.GetFile(this.repo, path);
        return new TextEncoder().encode(file.content);
    }
}
