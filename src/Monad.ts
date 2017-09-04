export abstract class Monad<T> {
  flatMap: Monad<T>['bind'] = this.bind.bind(this);

  abstract map<U>(transform: (v: T) => U): Monad<U>;
  abstract bind<U>(transform: (v: T) => Monad<U>): Monad<U>;
  abstract chain<U>(transforms: Array<(v: T) => U>): Monad<U>;
}