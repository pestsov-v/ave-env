import {EnvReader} from './src'
const envReader = new EnvReader()
envReader.setConfigs()
// console.log(process.env.HTTP_LOCALHOST)
// console.log(process.env)

console.log(envReader.getNum('SODU_PORT'))