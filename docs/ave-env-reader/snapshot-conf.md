# Слепки конфигурации

Слепки позволяют передать структуру конфигурации, таким образом избегая прямой передачи готовых JSON файлов через различные носители или мессенджеры.
Также это удобно, если необходимо опубликовать структуру в какую-либо систему контроля версий, например в `GitHab`.

## Получение слепка

### 1. Слепок приватных переменных {docsify-ignore}
`EnvReader` пробежит по всем файлам конфигурации, считывая переменные, записывая ключ - равноценный ключ из файла конфигурации, 
значение - тип записи, в такие же файлы. Файлы слепка будут повторять структуру папки с файлами конфигурации.

**Папка с конфигурациями**
```json
    {
      "HTTP_PORT": 4032,
      "HTTP_HOST": "192.17.82.901",
      "isOpened": false
    }
```

**Слепок**
```json
    {
      "HTTP_PORT": "number",
      "HTTP_HOST": "string",
      "isOpened": "boolean"
    }
```

### 2. Слепок модов {docsify-ignore}

`EnvReader` пробегается по всем путям модов, считывает их, после чего формирует слепок, который состоит из ключа указывающий на мод и сама структура мода.

**env.mode.json**
```json
    {
      "ENV_MODE_ers": "/home/administrator/ers.json"
    }
```
**ers.json**
```json
    {
      "ERS_NAME": "MER01",
      "ERS_SERVER_NUMBER": 12
    }
```
**Слепок**
```json
    {
      "ers": {
        "ERS_NAME": "string",
        "ERS_SERVER_NUMBER": "number"
      }
    }
```

### 3. Слепок ключей {docsify-ignore}

`EnvReader` пробегается по всем путям ключей, считывает их, после чего формирует слепок, который состоит из ключа указывающий на название приватного ключа и тип ключа в зависимости от его расширения.
Если у ключа нет расширения, то `EnvReader` укажет в строке - `unknown format`

**env.key.json**
```json
    {
      "ENV_KEY_firebaseKey": "/home/administrator/firebaseKey.pem",
      "ENV_KEY_unixCertificate": "/home/administrator/unix"
    }
```
**Слепок**
```json
    {
      "firebaseKey": "pem",
      "unixCertificate": "unknown format"
    }
```

