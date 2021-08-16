import { GitHub } from './github';
import { PersistenceProvider } from '../types/persistence';

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

    public async save(path: string, content: string | Buffer): Promise<void> {
        const buffer =
            typeof content === 'string' ? Buffer.from(content) : content;

        await this.github.UploadOrUpdateFile({
            content: buffer,
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
