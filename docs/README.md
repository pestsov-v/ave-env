# Главная

`EnvReader` является частью технологического стека `Ave` и одновременно независимым целым. <br/> <br/>
`EnvReader` был создан с целью упростить работу с переменными окружения. Модуль позволяет работать с разными режимами работами,
гибко указывать расположения папок с конфигурационными файлами, получать конкретную переменную в уже преобразованном, нужно виде
или создавать различные уровни приватности переменных, тем самым позволяет по-настоящему масштабировать любое приложение.

## Философия
Легковесность, неизменность принципов `process.env`, повышенная приватность с помощью
различных принципов хранения приватных переменных, ориентированность на масштабированные, взаимозависимые модули системы

## Установка и запуск
1. Чтобы начать пользоваться пакетом, необходимо его установить:
```
npm install ave-env-reader
```

2. Создать папку `config` в корне проекта:

<!-- tabs:start -->
#### **JavaScript**

```
.
├── config
|   └── your_config_file.json
├── src
|    └── index.js
├── package.json
```

#### **TypeScript**
```
.
├── config
|   └── your_config_file.json
├── src
|    └── index.ts
├── package.json
```
<!-- tabs:end -->

3. Записать все файлы конфигурации, которые находятся в папке:

<!-- tabs:start -->
#### **JavaScript**

```javascript
const envReader = require('ave-env-reader');
envReader.setConfigs();
```

#### **TypeScript**

```typescript
import envReader from 'docs/ave-env-reader';

envReader.setConfigs();
```
<!-- tabs:end -->

Доставать переменные с помощью:
```typescript
const YOUR_VARIABLE = envReader.get('VARIABLE_NAME', 'VARIABLE_TYPE') // VARIABLE_TYPE может быть string, number or boolean
```


