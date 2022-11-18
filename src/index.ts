import fs from "fs";
import IEnvReader, {EnvKind, TypeKind} from "../types/index";

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
        const setSpecificVars = (path: string) => {
            const readBufferSync = fs.readFileSync(path).toString();
            const variables = JSON.parse(readBufferSync);
            this._setVariables(variables);
        }

        if (configPath) {
            this._configPath = configPath
        } else {
            if (process.env.NODE_ENV === EnvKind.DEVELOPMENT ||
                process.env.NODE_ENV === EnvKind.PRODUCTION ||
                process.env.NODE_ENV === EnvKind.TEST
            ) {
                this._configPath = `${process.cwd()}/config/${config}.${process.env.NODE_ENV}.json`
                setSpecificVars(this._configPath)
            }
            const hasConfig = fs.readdirSync(this._folderPath).includes(`${config}.json`)
            if (hasConfig) {
                this._configPath = `${process.cwd()}/config/${config}.json`
                setSpecificVars(this._configPath)
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

    private _setVariables(variables: Record<string, string>): void {
        for (const variable in variables) {
            process.env[variable] = variables[variable];
        }
    }

    public get(name: string, type?: TypeKind): string | number | boolean {
        const variable = process.env[name]
        if (variable === undefined || variable === '') {
            const e = new Error(`Could not read the "${name}" configuration parameter`)
            console.error(e)
            throw e
        }

        switch (type) {
            case 'string':
                return variable
            case 'number':
                  const value = Number(variable)
                    if (Number.isNaN(value)) {
                        throw new Error('Wrong value for numeric parameter');
                    }
                    return value
            case 'boolean':
                if (variable !== 'false' && variable !== 'true') {
                    throw new Error('Wrong value for boolean parameter');
                }
                return variable !== 'false'
            default:
                return variable
        }
    }
}

export default new EnvReader();
