export interface PersistenceProvider {
    save(path: string, content: string | Uint8Array): Promise<void>;
    load(path: string): Promise<Uint8Array>;
}
