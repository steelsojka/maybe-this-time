export class Maybe<T> {
  constructor(private _value: T | null = null) {}

  isNone(): boolean {
    return this._value === null || this._value === void 0;
  }

  hasValue(): boolean {
    return !this.isNone();
  }

  value(): T {
    if (this.isNone()) {
      throw new Error('Can not get value \'null\'');
    }

    return this._value as T;
  }

  map(transform: (v: T) => T): Maybe<T> {
    return this.isNone() ? Maybe.none() as any : Maybe.of<T>(transform(this._value as T));
  }

  orElse(other: T | Maybe<T>): Maybe<T> {
    return this.isNone() ? Maybe.of<T>(other) : this;
  }

  orValue(other: T | Maybe<T>): T {
    return this.orElse(other).value();
  }

  filter(predicate: (v: T) => boolean): Maybe<T> {
    return !this.isNone() && predicate(this._value as T) ? this : Maybe.none();
  }

  static of<U>(value: U | Maybe<U> | null): Maybe<U> {
    return value instanceof Maybe ? value : new Maybe(value);
  }

  static none<T>(): Maybe<T> {
    return Maybe.of<T>(null);
  }
}