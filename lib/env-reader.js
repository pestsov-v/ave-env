"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvReader = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
class EnvReader {
    constructor(options) {
        this._configPath = "";
        this._folderPath = `${process.cwd()}/config`;
        this._logger = logger_1.default;
        if (options === null || options === void 0 ? void 0 : options.mode)
            this.setModeOrKeys('mode');
        if (options === null || options === void 0 ? void 0 : options.keys)
            this.setModeOrKeys('key');
    }
    setConfig(config, configPath) {
        const setSpecificVars = (path) => {
            const readBufferSync = fs_1.default.readFileSync(path).toString();
            const variables = JSON.parse(readBufferSync);
            this._setVariables(variables);
        };
        if (configPath) {
            this._configPath = configPath;
        }
        else {
            if (process.env.NODE_ENV === "development" /* EnvKind.DEVELOPMENT */ ||
                process.env.NODE_ENV === "production" /* EnvKind.PRODUCTION */ ||
                process.env.NODE_ENV === "test" /* EnvKind.TEST */) {
                this._configPath = `${process.cwd()}/config/${config}.${process.env.NODE_ENV}.json`;
                setSpecificVars(this._configPath);
            }
            const hasConfig = fs_1.default.readdirSync(this._folderPath).includes(`${config}.json`);
            if (hasConfig) {
                this._configPath = `${process.cwd()}/config/${config}.json`;
                setSpecificVars(this._configPath);
            }
        }
    }
    setConfigs(path) {
        this._folderPath = path !== null && path !== void 0 ? path : this._folderPath;
        fs_1.default.readdirSync(this._folderPath).forEach(config => {
            const configChunks = config.split('.');
            if (configChunks[1] === process.env.NODE_ENV) {
                this.setConfig(configChunks[0]);
            }
        });
    }
    _setVariables(variables) {
        for (const variable in variables) {
            let finallyVariable = variables[variable];
            if (typeof finallyVariable !== 'string') {
                finallyVariable = String(finallyVariable);
            }
            if (process.env[variable]) {
                this._logger.warn(`Variable "${variable}" has been exists`);
            }
            process.env[variable] = finallyVariable;
        }
    }
    getStr(name, defaultValue) {
        var _a;
        return (_a = this._get(name, 'string')) !== null && _a !== void 0 ? _a : defaultValue;
    }
    getNum(name, defaultValue) {
        var _a;
        return (_a = this._get(name, 'number')) !== null && _a !== void 0 ? _a : defaultValue;
    }
    getBool(name, defaultValue) {
        var _a;
        return (_a = this._get(name, 'boolean')) !== null && _a !== void 0 ? _a : defaultValue;
    }
    _get(name, type) {
        const variable = process.env[name];
        if (variable === undefined || variable === '') {
            const e = new Error(`Could not read the "${name}" configuration parameter`);
            this._logger.error(e);
            throw e;
        }
        switch (type) {
            case 'string':
                return variable;
            case 'number':
                const value = Number(variable);
                if (Number.isNaN(value)) {
                    this._logger.error('Wrong value for numeric parameter');
                    throw new Error('Wrong value for numeric parameter');
                }
                return value;
            case 'boolean':
                if (variable !== 'false' && variable !== 'true') {
                    this._logger.error('Wrong value for boolean parameter');
                    throw new Error('Wrong value for boolean parameter');
                }
                return variable === 'true' ? true : false;
            default:
                return variable;
        }
    }
    setModeOrKeys(scope) {
        const scopePath = `${this._folderPath}/env.${scope}.json`;
        const scopes = JSON.parse(fs_1.default.readFileSync(scopePath).toString());
        for (const scope in scopes) {
            const scopeVars = JSON.parse(fs_1.default.readFileSync(scopes[scope]).toString());
            this._setVariables(scopeVars);
        }
    }
}
exports.EnvReader = EnvReader;
