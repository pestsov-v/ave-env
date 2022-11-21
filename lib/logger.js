"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor() {
        const dirtyDate = new Date();
        const hours = dirtyDate.getHours();
        const minutes = dirtyDate.getMinutes();
        const seconds = dirtyDate.getSeconds();
        this._NOW = `${hours}:${minutes}:${seconds}`;
        this._TITLE = `~ ENV-READER`;
        this._LEVEL = {
            INFO: '[INFO]',
            ERROR: '[ERROR]',
            WARN: '[WARNING]'
        };
        this._COLOR = {
            RED: "\x1b[31m%s\x1b[0m",
            GREEN: "\x1b[32m%s\x1b[0m",
            YELLOW: "\x1b[33m%s\x1b[0m"
        };
    }
    info(text) {
        console.error(`${this._COLOR.GREEN}`, `${this._TITLE} ${this._LEVEL.INFO} ${this._NOW} ${text}`);
    }
    warn(text) {
        console.warn(`${this._COLOR.YELLOW}`, `${this._TITLE} ${this._LEVEL.WARN} ${this._NOW} ${text}`);
    }
    error(text) {
        console.error(`${this._COLOR.RED}`, `${this._TITLE} ${this._LEVEL.ERROR} ${this._NOW} ${text}`);
    }
}
exports.default = new Logger();
