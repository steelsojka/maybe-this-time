export abstract class Monad<T> {
  flatMap: Monad<T>['bind'] = this.bind.bind(this);
  chain: Monad<T>['map'] = this.map.bind(this);

  abstract map<U>(transform: (v: T) => U): Monad<U>;
  abstract bind<U>(transform: (v: T) => Monad<U>): Monad<U>;
}