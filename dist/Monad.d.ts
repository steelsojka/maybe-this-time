export declare abstract class Monad<T> {
    flatMap: Monad<T>['bind'];
    chain: Monad<T>['map'];
    abstract map<U>(transform: (v: T) => U): Monad<U>;
    abstract bind<U>(transform: (v: T) => Monad<U>): Monad<U>;
}
