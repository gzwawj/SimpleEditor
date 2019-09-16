var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "marked"], function (require, exports, marked_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    marked_1 = __importDefault(marked_1);
    var md = function (data) {
        return marked_1.default(data);
    };
    exports.md = md;
});
