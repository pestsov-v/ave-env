interface IEnvReader {
    /**
     * @description Set specify config to `process.env`
     * @param path - absolute path to config file
     */
    setConfig(path?: string): void;
    /**
     * @description Set all private variables who have into configs to `process.env`.
     * @param path - absolute path to folder with configs. if configPath is missed - envReader has been read the "config" folder who can be created into app root folder.
     */
    setConfigs(path?: string): void;

    getStr(name: string, defaultValue?: string): string
    getNum(name: string, defaultValue?: number): number
    getBool(name: string, defaultValue?: boolean): boolean
}

export type TypeKind = 'string' | 'number' | 'boolean'

export const enum EnvKind {
    DEVELOPMENT =  'development',
    PRODUCTION = 'production',
    TEST = 'test'
}

export default IEnvReader