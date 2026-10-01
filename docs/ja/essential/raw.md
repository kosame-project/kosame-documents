---
title: エスケープハッチ
---

# エスケープハッチ（context.raw）

Kosameでは表現しきれない実装には、エスケープハッチを使用します。
エスケープハッチはdrizzleを直接書くことができます。

## context.raw

エスケープハッチは`context.raw`を呼び出し書くことができます。

```ts
context.raw.select().from(writerTable).where(eq(writerTable.email, body.email));
```
