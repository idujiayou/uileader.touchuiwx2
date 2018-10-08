"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compare(v1, v2) {
    var v1_ = (v1 || '0').split('.');
    var v2_ = (v2 || '0').split('.');
    for (var i = 0; i < (v1_.length > v2_.length ? v1_.length : v2_.length); i++) {
        var v1__ = Number(v1_[i]) || 0;
        var v2__ = Number(v2_[i]) || 0;
        if (v1__ < v2__) {
            return -1;
        }
        else if (v1__ > v2__) {
            return 1;
        }
    }
    return 0;
}
exports.compare = compare;
//# sourceMappingURL=verson.js.map