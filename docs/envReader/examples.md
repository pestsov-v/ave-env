## Простая реализация

Структура проекта:
```
.
├── my_config
|   └── http.json
|   └── ws.json
|   └── db.json
├── src
|    └── index.ts
├── package.json
```

Точка входа в приложение в `package.json`
```json
{
  "scripts": {
    "dev": "ts-node --files index.ts"
  }
}
```

Содержимое `http.json`:
```json
{
  "HTTP_PROTOCOL": "http",
  "HTTP_PORT": 3001
}
```

Содержимое `ws.json`:
```json
{
  "WS_PROTOCOL": "ws"
}
```

Содержимое `db.json`:
```json
{
  "PG_PORT": 5432,
  "PG_USERNAME": "username",
  "PG_PASSWORD": "root",
  "PG_DATABASE": "database_name"
}
```

Содержимое `index.ts`
```typescript
// Подключаем утилиту
import envReader from "@Average/utils";

// записываем приватные переременные в process.env
envReader.setConfigs('/home/example_project/my/config');

// получаем переменные из envReader
const wsProtocol = envReader.getVar<string>('WS_PROTOCOL'); // 'ws'
const httpPort = envReader.getVar<number>('HTTP_PORT'); // 3001
const pgPort = envReader.getVar<number>('PG_PORT') // 5432
```

## Реализация в режимах работы
Структура проекта:
```
.
├── my_config
|   └── http.development.production.json
|   └── http.test.json
|   └── env.development.json
├── src
|    └── index.ts
├── package.json
```
Точка входа в приложение в `package.json`
```json
{
  "scripts": {
    "dev": "ts-node --files index.ts"
  }
}
```
Содержимое `http.development.production.json`:
```json
{
  "HTTP_PROTOCOL": "http",
  "HTTP_PORT": 3001
}
```
Содержимое `http.test.json`:
```json
{
  "HTTP_PROTOCOL": "http",
  "HTTP_PORT": 3002
}
```
Содержимое `env.development.json`:
```json
{
  "PG_USERNAME": "user"
}
```
Содержимое `index.ts`
```typescript
// Подключаем утилиту
import envReader from "@Average/utils";

// записываем приватные переременные в process.env
envReader.setConfigs('/home/example_project/my/config');
```
Запустив `NODE_ENV` в режиме разработки (`NODE_ENV=development`):
```typescript
// получаем переменные из envReader
const wsProtocol = envReader.getVar<string>('HTTP_PROTOCOL'); // 'http'
const httpPort = envReader.getVar<number>('HTTP_PORT'); // 3001
const pgUsername = envReader.getVar<string>('PG_USERNAME'); // 'user'
```
Запустив `NODE_ENV` в режиме разработки (`NODE_ENV=production`):
```typescript
// получаем переменные из envReader
const wsProtocol = envReader.getVar<string>('HTTP_PROTOCOL'); // 'http'
const httpPort = envReader.getVar<number>('HTTP_PORT'); // 3001
const pgUsername = envReader.getVar<string>('PG_USERNAME'); // 'undefined'
```
Запустив `NODE_ENV` в режиме разработки (`NODE_ENV=test`):
```typescript
// получаем переменные из envReader
const wsProtocol = envReader.getVar<string>('HTTP_PROTOCOL'); // 'http'
const httpPort = envReader.getVar<number>('HTTP_PORT'); // 3002
const pgUsername = envReader.getVar<string>('PG_USERNAME'); // 'undefined'
```