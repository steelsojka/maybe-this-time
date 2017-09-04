"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Monad = /** @class */ (function () {
    function Monad() {
        this.flatMap = this.bind.bind(this);
        this.chain = this.map.bind(this);
    }
    return Monad;
}());
exports.Monad = Monad;
//# sourceMappingURL=Monad.js.map