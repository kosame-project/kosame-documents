---
title: トランザクション
---

# トランザクション

Kosameは`context.transaction(callback)`によるトランザクション機能を提供しています。

## 使い方

トランザクションの書き方として`context.transaction`を呼び引数としてcallbackを持たせます。

```ts
context.transaction(callback);
```

### afterCommit()

### afterRollback()
