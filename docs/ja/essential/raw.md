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
