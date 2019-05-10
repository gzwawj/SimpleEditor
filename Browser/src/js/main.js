var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./style", "./action", "./file", "clipboard"], function (require, exports, style_1, action_1, file_1, clipboard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    clipboard_1 = __importDefault(clipboard_1);
    style_1.init();
    action_1.action();
    file_1.file();
    if (clipboard_1.default.isSupported()) {
        new clipboard_1.default('li');
    }
});
