"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Monad_1 = require("./Monad");
/**
 * An interface that represents a value or the absences of a value.
 * @export
 * @class Maybe
 * @extends {Monad<T>}
 * @template T
 */
var Maybe = /** @class */ (function (_super) {
    __extends(Maybe, _super);
    /**
     * Creates an instance of Maybe.
     * @param {(T | null)} [_value=null]
     */
    function Maybe(_value) {
        if (_value === void 0) { _value = null; }
        var _this = _super.call(this) || this;
        _this._value = _value;
        _this.isSome = _this.hasValue.bind(_this);
        _this.orSome = _this.orValue.bind(_this);
        _this.some = _this.value.bind(_this);
        _this.isNothing = _this.isNone.bind(_this);
        _this._isValue = _this._value !== null && _this._value !== void 0;
        return _this;
    }
    /**
     * Whether the value is null or undefined.
     * @returns {boolean}
     */
    Maybe.prototype.isNone = function () {
        return !this._isValue;
    };
    /**
     * Whether there is a value other than undefined or null.
     * @returns {boolean}
     */
    Maybe.prototype.hasValue = function () {
        return !this.isNone();
    };
    /**
     * Returns the value held. If there is no value an error will be thrown.
     * @returns {T}
     */
    Maybe.prototype.value = function () {
        if (this.isNone()) {
            throw new Error('Can not get value \'null\' from Maybe');
        }
        return this._value;
    };
    /**
     * Binds the Maybe to another Maybe.
     * @param {(v: T) => Maybe<any>} bindFn
     * @returns {Maybe<any>}
     */
    Maybe.prototype.bind = function (bindFn) {
        return this.hasValue() ? bindFn(this._value) : this;
    };
    /**
     * Maps the value.
     * @param {(v: T) => any} transform
     * @returns {Maybe<any>}
     */
    Maybe.prototype.map = function (transform) {
        return this.isNone() ? this : Maybe.of(transform(this._value));
    };
    /**
     * Returns this Maybe if there is a value or else returns the other Maybe or wrapped value.
     * @param {(T | Maybe<T>)} other
     * @returns {Maybe<T>}
     */
    Maybe.prototype.orElse = function (other) {
        return this.isNone() ? Maybe.of(other) : this;
    };
    /**
     * Does the same thing as `orElse` excepts unwraps the value.
     * @param {(T | Maybe<T>)} other
     * @returns {T}
     */
    Maybe.prototype.orValue = function (other) {
        return this.orElse(other).value();
    };
    /**
     * Returns the value or null.
     * @returns {(T | null)}
     */
    Maybe.prototype.orNull = function () {
        return this.isNone() ? null : this._value;
    };
    /**
     * Filters the value of this Maybe.
     * @param {(v: T) => boolean} predicate
     * @returns {Maybe<T>}
     */
    Maybe.prototype.filter = function (predicate) {
        var _this = this;
        return this.bind(function (v) { return predicate(v) ? _this : Maybe.none(); });
    };
    /**
     * Returns a Maybe with null if the boolean flag is true.
     * @param {boolean | Maybe<boolean>} value
     * @returns {Maybe<T>}
     */
    Maybe.prototype.orNoneIf = function (value) {
        return Maybe.of(value).orNull() ? Maybe.none() : this;
    };
    /**
     * Creates a Maybe with the given value.
     * @static
     * @template U
     * @param {(U | Maybe<U> | null)} value
     * @returns {Maybe<U>}
     */
    Maybe.of = function (value) {
        if (value === void 0) { value = null; }
        return value instanceof Maybe ? value : new Maybe(value);
    };
    /**
     * Creates an empty Maybe.
     * @static
     * @template U
     * @returns {Maybe<U>}
     */
    Maybe.none = function () {
        return Maybe.of(null);
    };
    return Maybe;
}(Monad_1.Monad));
exports.Maybe = Maybe;
//# sourceMappingURL=Maybe.js.map