import { Mutex } from 'async-mutex';
import { Lock } from '../types/mutex';

export class MutexWrapper implements Lock {
    private mutex: Mutex;

    public constructor() {
        this.mutex = new Mutex();
    }

    public runExclusive<T>(callback: () => Promise<T>): Promise<T> {
        return this.mutex.runExclusive(callback);
    }
}

export { MutexWrapper as Mutex };
