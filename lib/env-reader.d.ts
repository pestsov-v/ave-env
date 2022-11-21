import { IEnvReader, EnvOptions } from "../types";
export declare class EnvReader implements IEnvReader {
    private readonly _logger;
    private _configPath;
    private _folderPath;
    constructor(options?: EnvOptions);
    setConfig(config: string, configPath?: string): void;
    setConfigs(path?: string): void;
    private _setVariables;
    getStr(name: string, defaultValue?: string): string;
    getNum(name: string, defaultValue?: number): number;
    getBool(name: string, defaultValue?: boolean): boolean;
    private _get;
    private setModeOrKeys;
}
//# sourceMappingURL=env-reader.d.ts.map