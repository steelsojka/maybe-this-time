import { Monad } from './Monad';
/**
 * An interface that represents a value or the absences of a value.
 * @export
 * @class Maybe
 * @extends {Monad<T>}
 * @template T
 */
export declare class Maybe<T> extends Monad<T> {
    private _value;
    isSome: Maybe<T>['hasValue'];
    orSome: Maybe<T>['orValue'];
    some: Maybe<T>['value'];
    isNothing: Maybe<T>['isNone'];
    private readonly _isValue;
    /**
     * Creates an instance of Maybe.
     * @param {(T | null)} [_value=null]
     */
    constructor(_value?: T | null);
    /**
     * Whether the value is null or undefined.
     * @returns {boolean}
     */
    isNone(): boolean;
    /**
     * Whether there is a value other than undefined or null.
     * @returns {boolean}
     */
    hasValue(): boolean;
    /**
     * Returns the value held. If there is no value an error will be thrown.
     * @returns {T}
     */
    value(): T;
    /**
     * Binds the Maybe to another Maybe.
     * @param {(v: T) => Maybe<any>} bindFn
     * @returns {Maybe<any>}
     */
    bind(bindFn: (v: T) => Maybe<any>): Maybe<any>;
    /**
     * Maps the value.
     * @param {(v: T) => any} transform
     * @returns {Maybe<any>}
     */
    map(transform: (v: T) => any): Maybe<any>;
    /**
     * Returns this Maybe if there is a value or else returns the other Maybe or wrapped value.
     * @param {(T | Maybe<T>)} other
     * @returns {Maybe<T>}
     */
    orElse(other: T | Maybe<T>): Maybe<T>;
    /**
     * Does the same thing as `orElse` excepts unwraps the value.
     * @param {(T | Maybe<T>)} other
     * @returns {T}
     */
    orValue(other: T | Maybe<T>): T;
    /**
     * Returns the value or null.
     * @returns {(T | null)}
     */
    orNull(): T | null;
    /**
     * Filters the value of this Maybe.
     * @param {(v: T) => boolean} predicate
     * @returns {Maybe<T>}
     */
    filter(predicate: (v: T) => boolean): Maybe<T>;
    /**
     * Returns a Maybe with null if the boolean flag is true.
     * @param {boolean | Maybe<boolean>} value
     * @returns {Maybe<T>}
     */
    orNoneIf(value: boolean | Maybe<boolean>): Maybe<T>;
    /**
     * Creates a Maybe with the given value.
     * @static
     * @template U
     * @param {(U | Maybe<U> | null)} value
     * @returns {Maybe<U>}
     */
    static of<U>(value?: U | Maybe<U> | null): Maybe<U>;
    /**
     * Creates an empty Maybe.
     * @static
     * @template U
     * @returns {Maybe<U>}
     */
    static none<U>(): Maybe<U>;
}
