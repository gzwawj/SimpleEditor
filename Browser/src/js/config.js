define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        qiniu: {
            host: 'po8j27fia.bkt.clouddn.com',
            bucket: 'phpsdk',
            list: {
                type: 'list',
                prefix: '',
                marker: '',
                limit: 2
            },
            upload: {
                type: 'upload'
            }
        }
    };
});
