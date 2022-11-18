import fs from "fs";
import IEnvReader, {EnvKind, TypeKind} from "../types/index";

// TODO created method to implements node_env modes
// TODO created custom profile_modes
// TODO created hierarchy to modes
// TODO created functionality to test environment and propose environment
// TODO add support to keys
// TODO add support to modes paths
// TODO add created seed manifest
// TODO add optional initial configuration to constructor with fields mode: true / keys: true

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

    private _setVariables(variables: Record<string, string | number | boolean>): void {
        for (const variable in variables) {
            let finallyVariable = variables[variable]
            if (typeof finallyVariable !== 'string') {
                finallyVariable = String(finallyVariable)
            }
            process.env[variable] = finallyVariable;
        }
    }

    public getStr(name: string, defaultValue?: string): string {
        return this.get<string>(name) ?? defaultValue
    }

    public getNum(name: string, defaultValue?: number): number {
        return this.get<number>(name) ?? defaultValue
    }

    public getBool(name: string, defaultValue?: boolean): boolean {
        return this.get<boolean>(name) ?? defaultValue
    }

    private get<T extends string | number | boolean>(name: string, type?: TypeKind): T {
        const variable = process.env[name]
        if (variable === undefined || variable === '') {
            const e = new Error(`Could not read the "${name}" configuration parameter`)
            console.error(e)
            throw e
        }

        switch (type) {
            case 'string':
                return variable as T
            case 'number':
                const value = Number(variable)
                if (Number.isNaN(value)) {
                    throw new Error('Wrong value for numeric parameter');
                }
                return value as T
            case 'boolean':
                if (variable !== 'false' && variable !== 'true') {
                    throw new Error('Wrong value for boolean parameter');
                }
                return variable === 'true' ? true as T : false as T
            default:
                return variable as T
        }
    }
}

export default EnvReader;
