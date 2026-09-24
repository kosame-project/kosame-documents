---
title: Creating a Context
---

# Creating a Context

Kosame is based on a context-driven design philosophy; by passing the tables defined in the Model to the Context, it establishes the entry point for actually executing queries.

## How to Create

In Kosame, create a `data` directory and write the Context in context.ts.

```
src/
└── data/
    └── context.ts
```

## How to Write a Context

Call the `createContext` function to link the database and the model.

```ts
import { createContext } from "kosame";
import { db } from "./db.js";
import { User } from "../models/user.js";

export const context = createContext(db, {
  users: User,
});
```
