import { Monad } from './Monad';

/**
 * An interface that represents a value or the absences of a value.
 * @export
 * @class Maybe
 * @extends {Monad<T>}
 * @template T 
 */
export class Maybe<T> extends Monad<T> {
  isSome: Maybe<T>['hasValue'] = this.hasValue.bind(this);
  orSome: Maybe<T>['orValue'] = this.orValue.bind(this);
  some: Maybe<T>['value'] = this.value.bind(this);
  isNothing: Maybe<T>['isNone'] = this.isNone.bind(this);

  private readonly _isValue: boolean;

  /**
   * Creates an instance of Maybe.
   * @param {(T | null)} [_value=null] 
   */
  constructor(private _value: T | null = null) {
    super();

    this._isValue = this._value !== null && this._value !== void 0;
  }

  /**
   * Whether the value is null or undefined.
   * @returns {boolean} 
   */
  isNone(): boolean {
    return !this._isValue;
  }

  /**
   * Whether there is a value other than undefined or null.
   * @returns {boolean} 
   */
  hasValue(): boolean {
    return !this.isNone();
  }

  /**
   * Returns the value held. If there is no value an error will be thrown.
   * @returns {T} 
   */
  value(): T {
    if (this.isNone()) {
      throw new Error('Can not get value \'null\' from Maybe');
    }

    return this._value as T;
  }

  /**
   * Binds the Maybe to another Maybe.
   * @param {(v: T) => Maybe<any>} bindFn 
   * @returns {Maybe<any>} 
   */
  bind(bindFn: (v: T) => Maybe<any>): Maybe<any> {
    return this.hasValue() ? bindFn(this._value as T) : this as Maybe<any>;
  }

  /**
   * Maps the value.
   * @param {(v: T) => any} transform 
   * @returns {Maybe<any>} 
   */
  map(transform: (v: T) => any): Maybe<any> {
    return this.isNone() ? this as Maybe<any> : Maybe.of(transform(this._value as T));
  }

  /**
   * Returns this Maybe if there is a value or else returns the other Maybe or wrapped value.
   * @param {(T | Maybe<T>)} other 
   * @returns {Maybe<T>} 
   */
  orElse(other: T | Maybe<T>): Maybe<T> {
    return this.isNone() ? Maybe.of<T>(other) : this;
  }

  /**
   * Does the same thing as `orElse` excepts unwraps the value.
   * @param {(T | Maybe<T>)} other 
   * @returns {T} 
   */
  orValue(other: T | Maybe<T>): T {
    return this.orElse(other).value();
  }

  /**
   * Returns the value or null.
   * @returns {(T | null)} 
   */
  orNull(): T | null {
    return this.isNone() ? null : this._value as T;
  }

  /**
   * Filters the value of this Maybe.
   * @param {(v: T) => boolean} predicate 
   * @returns {Maybe<T>} 
   */
  filter(predicate: (v: T) => boolean): Maybe<T> {
    return this.bind(v => predicate(v) ? this : Maybe.none());
  }

  /**
   * Returns a Maybe with null if the boolean flag is true.
   * @param {boolean | Maybe<boolean>} value 
   * @returns {Maybe<T>} 
   */
  orNoneIf(value: boolean | Maybe<boolean>): Maybe<T> {
    return Maybe.of(value).orNull() ? Maybe.none() : this;
  }

  /**
   * Creates a Maybe with the given value.
   * @static
   * @template U 
   * @param {(U | Maybe<U> | null)} value 
   * @returns {Maybe<U>} 
   */
  static of<U>(value: U | Maybe<U> | null = null): Maybe<U> {
    return value instanceof Maybe ? value : new Maybe(value);
  }

  /**
   * Creates an empty Maybe.
   * @static
   * @template U 
   * @returns {Maybe<U>} 
   */
  static none<U>(): Maybe<U> {
    return Maybe.of<U>(null);
  }
}