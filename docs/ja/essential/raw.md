---
title: エスケープハッチ
---

# エスケープハッチ（context.raw）

Kosameでは表現しきれない実装には、エスケープハッチを使用します。
エスケープハッチはdrizzleを直接書くことができます。

## context.raw

エスケープハッチは`context.raw`を呼び出し、その後にdrizzleを書きます。

```ts
context.raw.select().from(userTable).where(eq(userTable.name, "kosame"));
```

### トランザクション中のtxContext.raw

`txContext.raw`は自動的にそのトランザクションの`tx`ハンドルを指します。

### sqlite

`better-sqlite3`/`bun:sqlite`は単一コネクションのため`txContext.raw`/`context.raw`が同一オブジェクトを指します。
