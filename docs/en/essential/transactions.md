---
title: Transactions
---

# Transactions

Kosame provides transaction functionality via `context.transaction(callback)`.

## How to Use

To define a transaction, call `context.transaction()` and pass a callback as an argument.

```ts
await context.transaction(async (txContext) => {
  const user = await txContext.users.add({ name: "kosame" });
});
```

### afterCommit()

`afterCommit(callback)` is a method that is called within a transaction's callback to register the processing you want to execute after a successful commit.

```ts
await context.transaction(async (txContext) => {
  const user = await txContext.users.add({ name: "kosame" });

  txContext.afterCommit(() => {
    console.log("The commit was successful.");
  });
});
```

### afterRollback()

`afterRollback(callback)` is a method that is called within a transaction's callback to register the processing you want to execute after a rollback occurs.
