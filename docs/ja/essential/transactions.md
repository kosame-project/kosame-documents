---
title: トランザクション
---

# トランザクション

Kosameは`context.transaction(callback)`によるトランザクション機能を提供しています。

## 使い方

トランザクションの書き方として`context.transaction()`を呼び引数としてcallbackを持たせます。

```ts
await context.transaction(async (txContext) => {
  const user = await txContext.users.add({ name: "kosame" });
});
```

### afterCommit()

`afterCommit()`はコミット成功後に呼び出す。

```ts
await context.afterCommit();
```

### afterRollback()
