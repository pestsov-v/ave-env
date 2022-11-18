# Доступ к переменным
Поскольку Average записывает переменные в `process.env`, то и достучатся до них возможно через - `process.env.[КЛЮЧ_ПЕРЕМЕННОЙ]`,
но доставать переменные таким образом **не рекомендуется**. В `envReader` есть встроенный метод - `getVar`, который предназначен для вытягивания данных.
```javascript
const variable = envReader.getVar('PG_PORT')
```

Если в проекте используется TypeScript, то можно указать тип данных переменной: number, string или boolean.
```typescript
const variable = envReader.getVar<number>('PG_PORT') // Вернёт значение преобразовав его в числовой тип данных
```
