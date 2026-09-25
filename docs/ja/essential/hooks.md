---
title: Hooks
---

# Hooks

KosameはCRUD操作の実行前に呼ばれ、例外を投げると書き込みを中止できるHooksを提供しています。

## Hooksの使い方

### beforeCreate()

`beforeCreate()`を呼び出すと、`context.<collection>.add`前に実行され例外を投げることで書き込みを中止させることができます。使い方は`add()`と同じで`beforeCreate()`を`context.<collection>.beforeCreate`で使用できます。

```ts
const user = await context.users.beforeCreate({ name: "kosame" });
```

### beforeUpdate(changes)

### beforeDelete()
