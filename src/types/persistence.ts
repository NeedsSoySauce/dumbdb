export interface PersistenceProvider {
    save(path: string, content: string | Buffer): Promise<void>;
    load(path: string): Promise<Buffer>;
}
