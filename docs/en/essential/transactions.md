---
title: Transactions
---

# Transactions

Kosame provides transaction functionality via `context.transaction(callback)`.

## 使い方

To define a transaction, call `context.transaction()` and pass a callback as an argument.

```ts
await context.transaction(async (txContext) => {
  const user = await txContext.users.add({ name: "kosame" });
});
```
