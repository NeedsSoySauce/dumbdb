import { GitHub } from './github';
import { PersistenceProvider } from '../types/persistence';
import { Mutex } from '../mutex';
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

    public async save(path: string, content: string | Buffer): Promise<void> {
        const buffer =
            typeof content === 'string' ? Buffer.from(content) : content;

        await this.mutex.runExclusive(async () => {
            const result = await this.github.UploadOrUpdateFile({
                content: buffer,
                path,
                repo: this.repo,
            });
            return Promise.resolve(result);
        });
    }

    public async load(path: string): Promise<Buffer> {
        const file = await this.github.GetFile(this.repo, path);

        if (!Buffer.isEncoding(file.encoding)) {
            throw Error(`Unsupported encoding '${file.encoding}'`);
        }

        return Buffer.from(file.content, file.encoding);
    }
}
