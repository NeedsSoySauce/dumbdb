interface AbstractAsyncBuilder<T> {
    build(): Promise<T>;
}

export { AbstractAsyncBuilder };
