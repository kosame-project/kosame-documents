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

`afterCommit(callback)`は、トランザクションのコールバック内で呼び出し、コミットが成功した後に実行したい処理を登録するメソッドです。

```ts
await context.transaction(async (txContext) => {
  const user = await txContext.users.add({ name: "kosame" });

  txContext.afterCommit(() => {
    console.log("コミットが成功しました");
  });
});
```

### afterRollback()

`afterRollback(callback)`は、トランザクションのコールバック内で呼び出し、ロールバックが発生した後に実行したい処理を登録するメソッドです。

```ts
await context.transaction(async (txContext) => {
  const user = await txContext.users.add({ name: "kosame" });

  txContext.afterRollback(() => {
    console.log("ロールバックされました");
  });

  throw new Error("エラー");
});
```

## dialectの違い

sqlite以外のデータベースではDrizzleネイティブの`db.transaction()`が処理をしています。ですがsqliteは例外で`bun:sqlite`/`better-sqlite3`のような同期ドライバでは、`db.transaction()`に非同期コールバックを渡すと正しく動作しません。
なのでsqliteでは、生SQLの`BEGIN`/`COMMIT`/`ROLLBACK`を手動発行で解決しています。
