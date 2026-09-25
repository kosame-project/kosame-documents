---
title: Hooks
---

# Hooks

KosameはCRUD操作の実行前に呼ばれ、例外を投げると書き込みを中止できるHooksを提供しています。

## Hooksの使い方

### beforeCreate()

`beforeCreate()`はModelクラスに`override`して使います。`context.<collection>.add()`が実行される前に自動的に呼ばれ、例外を投げることで書き込みを中止させることができます。

```ts
override async beforeCreate(){
  if(!this.name.includes("kosame")){
    throw new Error("名前にkosameを入れてください");
  }
}
```

`beforeCreate()`が呼ばれる時点で、`this.name`には既に挿入予定の値が入っています。この例のコードでは、名前に`kosame`が含まれていない場合に例外を投げて書き込みを中止させています。

### beforeUpdate(changes)

`beforeUpdate()`はModelクラスに`override`して使います。インスタンスの`update()`が実行される前に自動で呼ばれ、例外を投げることで書き込みを中止させることができます。`changes`は参照渡しなので、フック内で書き換えるとその内容がそのままDBへの書き込みに反映されます。

### beforeDelete()

`beforeDelete()`はModelクラスに`override`して使います。インスタンスの`delete()`が実行される前に自動で呼ばれ、例外を投げることで書き込みを中止させることができます。
