---
title: Relations
---

# Relations

Kosame provides relationship functionality using `hasMany` and `belongsTo`.
The design of these relationships does not use JOIN clauses; instead, it retrieves related records using batch queries with the IN clause.

## How to Establish Relationships

### hasMany()

The `hasMany()` relationship represents a “many” side.
To use it, import `hasMany()` with `import { hasMany } from “kosame”;`.
The arguments for `hasMany()` are a function that returns the target Model class and the `foreignKey`/`localKey`.
`foreignKey` is required, while `localKey` is optional. If omitted, the primary key of the parent table is used.

```ts
  static relations = { posts: hasMany(() => Post, { foreignKey: "authorId",})};
```

### belongsTo()
