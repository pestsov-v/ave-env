export type TypeKind = 'string' | 'number' | 'boolean'
export type ScopeKind = 'mode' | 'key'

export const enum EnvKind {
    DEVELOPMENT =  'development',
    PRODUCTION = 'production',
    TEST = 'test'
}