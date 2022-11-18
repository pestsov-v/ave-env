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
    /**
     * @description Get specify private variable from `process.env`
     * @typeParam T - Data type. Can be set the number string or boolean if variableName should be this type.
     * @param name - Required parameter. Key private variable
     * @param type - Optional parameter. Add the specific type of value and then value has been transformed in this type
     * @returns Private variable with specify data type
     * */
    get(name: string, type?: TypeKind): string | number | boolean;
}

export type TypeKind = 'string' | 'number' | 'boolean'

export const enum EnvKind {
    DEVELOPMENT =  'development',
    PRODUCTION = 'production',
    TEST = 'test'
}

export default IEnvReader