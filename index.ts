import envReader from './src/index'
envReader.setConfigs()
// console.log(process.env.HTTP_LOCALHOST)
// console.log(process.env)

console.log(envReader.get('HTTP_NUM', 'boolean') )