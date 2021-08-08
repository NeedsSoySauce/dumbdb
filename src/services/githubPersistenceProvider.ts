import { GitHub } from './github';
import { PersistenceProvider } from '../types/persistenceProvider';

export interface GitHubPersistenceProviderOptions {
    github: GitHub;
    repo: string;
}

export class GitHubPersistenceProvider implements PersistenceProvider {
    private github: GitHub;
    private repo: string;

    public constructor(params: GitHubPersistenceProviderOptions) {
        this.github = params.github;
        this.repo = params.repo;
    }

    public async save(path: string, content: Buffer): Promise<void> {
        await this.github.UploadOrUpdateFile({
            content,
            path,
            repo: this.repo,
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
