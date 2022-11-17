import fs from "fs";
import path from "path";
import IEnv, {PrivateVariables} from "../types/index";

// TODO created method to implements node_env modes

class Env implements IEnv {
    private _variables: PrivateVariables;
    private _configs: string[];
    private _configPath: string;
    private _configFolderPath: string;

    constructor() {
        this._variables = {};
        this._configs = [];
        this._configPath = "";
        this._configFolderPath = path.join(__dirname, `../../config/`);
    }

    public setConfig(config: string, configPath?: string) {
        this._configPath = configPath ?? path.join(
            __dirname,
            `../../config/${config}.config.json`
        )

        const readBufferSync = fs.readFileSync(this._configPath).toString();
        this._variables = JSON.parse(readBufferSync);
        this.setVariables();
    }

    public setConfigs(configFolderPath?: string): void {
        this._configFolderPath = configFolderPath ?? this._configFolderPath

        this._configs = fs
            .readdirSync(this._configFolderPath)
            .map((config) => config.split(".")[0]);
        this._configs.map((config) => this.setConfig(config));
    }

    public get<T extends number | string | boolean>(variableName: string): T {
        return process.env[variableName] as T;
    }

    private setVariables() {
        for (const variable in this._variables) {
            process.env[variable] = this._variables[variable];
        }
    }
}

export default new Env();
