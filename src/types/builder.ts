export interface AbstractAsyncBuilder<T> {
    build(): Promise<T>;
}
