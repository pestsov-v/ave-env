import fs from "fs";
import IEnvReader, {EnvKind} from "../types/index";

// TODO created method to implements node_env modes
// TODO created custom profile_modes
// TODO created hierarhy to modes
// TODO created functionality to test environment and propose environment

class EnvReader implements IEnvReader {
    private _configPath: string;
    private _folderPath: string;

    constructor() {
        this._configPath = "";
        this._folderPath = `${process.cwd()}/config/`;
    }

    public setConfig(config: string, configPath?: string): void {
        if (configPath) {
            this._configPath = configPath
        } else {
            if (process.env.NODE_ENV === EnvKind.DEVELOPMENT || EnvKind.PRODUCTION || EnvKind.TEST) {
                this._configPath = `${process.cwd()}/config/${config}.${process.env.NODE_ENV}.json`
                const readBufferSync = fs.readFileSync(this._configPath).toString();
                const variables = JSON.parse(readBufferSync);
                this.setVariables(variables);
            }

            const hasConfig = fs.readdirSync(this._folderPath).includes(`${config}.json`)
            if (hasConfig) {
                this._configPath = `${process.cwd()}/config/${config}.json`
                const readBufferSync = fs.readFileSync(this._configPath).toString();
                const variables = JSON.parse(readBufferSync);
                this.setVariables(variables);
            }
        }
    }

    public setConfigs(path?: string): void {
        this._folderPath = path ?? this._folderPath

        fs.readdirSync(this._folderPath).forEach(config => {
            const configChunks = config.split('.')
            if (configChunks[1] === process.env.NODE_ENV) {
                this.setConfig(configChunks[0])
            }
        })
    }

    public get<T extends number | string | boolean>(name: string): T {
        return process.env[name] as T;
    }

    private setVariables(variables: Record<string, string>): void {
        for (const variable in variables) {
            process.env[variable] = variables[variable];
        }
    }
}

export default new EnvReader();
