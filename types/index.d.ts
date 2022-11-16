interface IEnv {
    /**
     * @description Set specify config to `process.env`
     * @param configPath - absolute path to config file
     */
    setConfig(configPath?: string): void;
    /**
     * @description Set all private variables who have into configs to `process.env`.
     * @param configPath - absolute path to folder with configs. if configPath is missed - envReader has been read the "config" folder who can be created into app root folder.
     */
    setConfigs(configPath?: string): void;
    /**
     * @description Get specify private variable into `process.env`
     * @typeParam T - Data type. Can be set the number string or boolean if variableName should be this type.
     * @param variableName - Key private variable
     * @returns Private variable with specify data type
     * */
    get<T extends number | string | boolean>(variableName: string): T;
}

export type PrivateVariables = {
    [key: string]: string;
};

export default IEnv