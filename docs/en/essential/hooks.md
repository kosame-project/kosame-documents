---
title: Hooks
---

# Hooks

Kosame provides hooks that are called before CRUD operations are executed and allow you to abort a write operation by throwing an exception.

## How to Use Hooks

### beforeCreate()

You use `beforeCreate()` by `overriding` it in the Model class. It is automatically called before `context.<collection>.add()` is executed, and you can prevent the write operation by throwing an exception.

```ts
override async beforeCreate() {
  if (!this.name.includes("kosame")) {
    throw new Error("名前にkosameを入れてください");
  }
}
```
