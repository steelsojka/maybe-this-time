import { Monad } from './Monad';

export class Maybe<T> extends Monad<T> {
  isSome: Maybe<T>['hasValue'] = this.hasValue.bind(this);
  orSome: Maybe<T>['orValue'] = this.orValue.bind(this);
  some: Maybe<T>['value'] = this.value.bind(this);
  isNothing: Maybe<T>['isNone'] = this.isNone.bind(this);

  private readonly _isValue: boolean = this._value !== null && this._value !== void 0;

  constructor(private _value: T | null = null) {
    super();
  }

  isNone(): boolean {
    return this._isValue;
  }

  hasValue(): boolean {
    return !this.isNone();
  }

  value(): T {
    if (this.isNone()) {
      throw new Error('Can not get value \'null\' from Maybe');
    }

    return this._value as T;
  }

  bind<U>(bindFn: (v: T) => Maybe<U>): Maybe<U> {
    return this.hasValue() ? bindFn(this._value as T) : this as Maybe<any>;
  }

  map<U>(transform: (v: T) => U): Maybe<U> {
    return this.isNone() ? this as Maybe<any> : Maybe.of<U>(transform(this._value as T));
  }

  orElse(other: T | Maybe<T>): Maybe<T> {
    return this.isNone() ? Maybe.of<T>(other) : this;
  }

  orValue(other: T | Maybe<T>): T {
    return this.orElse(other).value();
  }

  orNull(): T | null {
    return this.isNone() ? null : this._value;
  }

  filter(predicate: (v: T) => boolean): Maybe<T> {
    return this.bind(v => predicate(v) ? this : Maybe.none());
  }

  orNoneIf(value: boolean): Maybe<T> {
    return value ? Maybe.none() : this;
  }

  chain<U>(transforms: Array<(v: T) => U>): Maybe<U> {
    return transforms.reduce((result: Maybe<any>, transform) => {
      return result.hasValue() ? Maybe.of(transform(result.value() as any)) : this;
    }, this);
  }

  static of<U>(value: U | Maybe<U> | null): Maybe<U> {
    return value instanceof Maybe ? value : new Maybe(value);
  }

  static none<T>(): Maybe<T> {
    return Maybe.of<T>(null);
  }
}