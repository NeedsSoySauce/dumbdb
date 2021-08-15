import fs from 'fs';
import { PersistenceProvider } from '../types/persistence';

export class FileSystemPersistenceProvider implements PersistenceProvider {
    public async save(
        path: string,
        content: Buffer,
        encoding?: BufferEncoding,
    ): Promise<void> {
        fs.writeFileSync(path, content, {
            encoding,
        });
    }

    public async load(path: string): Promise<Buffer> {
        return fs.readFileSync(path);
    }
}
