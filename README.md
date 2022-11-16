# Структура конфигураций
Абсолютное большинство проектов требует хранения приватных переменных.
Зачастую это требуется для различных `NODE_ENV` режимов работы приложения, такие как `development`, `production` или `test`. <br/>

Average пошел дальше и позволяет создавать конфигурации не только под различные `NODE_ENV` режимы, а и с любыми конфигурационными файлами.
Это позволяет по-настоящему гибко конфигурировать Ваше приложение, таким образом не ограничивая его в горизонтальном масштабировании.

## Загрузка переменных

При запуске проекта работающего с Average в указанном месте подключения утилиты `envReader` Average синхронно вычитает все
переменные и запишет их в `process.env`.

> [!WARNING]
> Подключайте утилиту в точке входа в Ваше приложение, например index.ts в вашем скрипте если проект написан на TypeScript,
которую Вы указываете в package.json или index.js, если проект написан на JavaScript

<!-- tabs:start -->

#### **JavaScript**

```json
{
  "scripts": {
    "dev": "ts-node --files index.ts"
  }
}
```


#### **TypeScript**

```json
{
  "scripts": {
    "dev": "node index.js"
  }
}
```

<!-- tabs:end -->


> [!ATTENTION]
> Если в проекте работающего с Average в каком-то месте Вашей программы вы укажите новое значение переменной, то она изменится и в
`process.env`. Если Вам подобные изменения не нужны сознательно, то рекомендуется следовать соглашению по названию переменных

## Соглашение по названию переменных

Average построен и спроектирован так, чтобы быть максимально чистым, перебирая правила игры у `Node.js`. Таким образом
`envReader` не модифицирует ни ключи, ни значение Ваших приватных переменных. <br/> <br/>

Особенностью работы `process.env` встроенному модуля `process` в `Node.js` является запись приватных переменных с уникальным
названием. Таким образом допуская переопределения переменных в рамках считывание компилятором по всей кодовой базе программы.
Чтобы правильно организовать название переменных

> [!WARNING]
> Называйте переменные в SCREAMING_SNAKE_CASE формате с
выделением общей части названия нескольких приватных переменных в дополнительный блок названия переменной

```json
{
    "PG_PORT": 5432,
    "PG_USERNAME": "username",
    "PG_PASSWORD": "root",
    "PG_DATABASE": "database_name",
    "MYSQL_PORT": 3306,
    "MYSQL_USERNAME": "username",
    "MYSQL_PASSWORD": "root",
    "MYSQL_DATABASE": "database_name",
}
```

Таким образом в `process.env` переменные будут записаны соответственно:
```
{
    PG_PORT: 5432,
    PG_USERNAME: 'username',
    PG_PASSWORD: 'root',
    PG_DATABASE: 'database_name', 
    MYSQL_PORT: 3306, 
    MYSQL_USERNAME: 'username',
    MYSQL_PASSWORD: 'root',
    MYSQL_DATABASE: 'database_name'
}
```

## Конфигурации для режимов работы
В большинстве случаев необходима работа приложения в различных режимах, таких как:
- разработки
- тестирования
- рабочей среды

Чтобы разделять приватные переменные, к примеру подключения к базе данных, таким образом при запуске тестов -
использовать тестовую базу данных, в период разработки - базу данных для разработки и соответственно в рабочей среде -
базу рабочей среды (и соответственно для каждой такой базы необходимы свои значение приватных переменных при тех же ключах). <br/>

> [!NOTE]
> Average поддерживает два формата считывания переменных для различных режимов работы: через файл конфигурации режима работы и через блок
режима работы указанный в названии определенного файла конфигурации

### Файл режима работы
Данный формат лучший вариант, если у Вас есть необходимость создать файл конфигурации ради малого количества переменных.
Таким образом, чтобы не плодить файлов з малым количеством переменных, такие переменные лучше записать в файл конфигурации определенного режима работы.

Average предусматривает следующие соглашения названий для файлов конфигурации режимов работы:
- `env.development.json` - для работы в режиме разработки.
- `env.test.json` - для работы в режиме тестирования.
- `env.production.json` - для работы в режиме рабочей среды.

И соответственно в структуре проекта:
```
.
├── config
|   └── env.development.json
|   └── env.test.json
|   └── env.production.json
```
При этом первый блок - `env` в любом из названий файлов режима конфигурации означает что это глобальный файл конфигурации для режима работы,
Второй же блок `development`, `test` или `production` определяет какой режим работы будет исполняться.

### Режим работы в определенных файлах
Данный формат лучший вариант, если Вас необходимы различные значения ключей приватных переменных в различных режимах работы.
Average так устроен, что он считывает название Ваших файлов конфигурации. Если в названии файла указаны режимы работы
приложения, то они будут применяться в определенных режимах работы, таким образом избавляя Вас от дублирования кода.
```
.
├── config
|   └── http.development.json
|   └── http.test.json
```
Также поддерживаются несколько режимов работы для файлов конфигурации если их описывать через точку в названии файла.
Порядок описание режимов работы неважен
```
.
├── config
|   └── http.development.production.json
|   └── http.test.json
```

**Важно: слова "development", "test", "production", "env" зарезервированы и применяются для корректной работы режимов!**

### Запуск в нужном режиме работы
Для запуска приложения в определённом режиме работы, необходимо прописать `NODE_ENV` в Вашем `package.json`

<!-- tabs:start -->

#### **JavaScript**
```json
{
  "name": "my_app",
  "scripts": {
    "start:test": "NODE_ENV=test node index.js",
    "start:dev": "NODE_ENV=development node index.js",
    "start:prod": "NODE_ENV=production node index.js"
  }
}
```
#### **TypeScript**

```json
{
  "name": "my_app",
  "scripts": {
    "start:test": "NODE_ENV=test ts-node --files index.ts",
    "start:dev": "NODE_ENV=development ts-node --files index.ts",
    "start:prod": "NODE_ENV=production ts-node --files index.ts"
  }
}
```
<!-- tabs:end -->

## Папка с файлами конфигурации
Чтобы подключить файл конфигурации с описанными приватными переменными, необходимо подключить утилиту `envReader`,
после чего записать в неё абсолютный путь, в формате строки, к файлам конфигурации:

```javascript
import envReader from '@Average';
envReader.setConfigs(<АБСОЛЮТНЫЙ_ПУТЬ К ПАПКЕ С КОНФИГУРАЦИОННЫМИ ФАЙЛАМИ>)
```

### Путь по умолчанию
Для удобства Average по умолчанию смотрит на файлы конфигурации в папке `config` которая знаходится в корне вашего приложения.
Таким образом Вам не нужно указывать явный путь к папке с файлами конфигурации, а создать папку `config`
после чего добавлять в неё файлы с приватными переменными. Также не нужно вызывать никакие методы записи.

```
.
├── config
|   └── _файл_конфигурации_1.json
|   └── _файл_конфигурации_2.json
|   └── _файл_конфигурации_3.json
├── src
|    └── index.ts
├── package.json
```

### Путь к определенному файлу
Если необходимо подтянуть в проект определённый файл, который находится вне вашего проекта - Average это позволяет.
Всё что необходимо это прописать абсолютный путь в метод `setConfig`.

```javascript
import envReader from '@Average';
envReader.setConfig(<АБСОЛЮТНЫЙ_ПУТЬ К ФАЙЛУ С ПРИВАТНЫМИ ПЕРЕМЕННЫМИ>);
```

## Доступ к переменным
Поскольку Average записывает переменные в `process.env`, то и достучатся до них возможно через - `process.env.[КЛЮЧ_ПЕРЕМЕННОЙ]`,
но доставать переменные таким образом **не рекомендуется**. В `envReader` есть встроенный метод - `getVar`, который предназначен для вытягивания данных.
```javascript
const variable = envReader.getVar('PG_PORT')
```

Если в проекте используется TypeScript, то можно указать тип данных переменной: number, string или boolean.
```typescript
const variable = envReader.getVar<number>('PG_PORT') // Вернёт значение преобразовав его в числовой тип данных
```

## Пример простой реализации
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

## Пример реализации в режимах работы
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