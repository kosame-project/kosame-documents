---
title: Creating a Model
---

# Creating a Model

## About the Model

Kosame features a “Model” concept that Drizzle does not have. This is similar to the “Model” found in other ORMs, such as EF Core and Active Record, and it allows for implementation that more closely aligns with the design—a key feature of Kosame.

## How to Create

In Kosame, you generally create a `Model` directory and then create individual tables within that directory.

```
src/
└── models/
    └── user.ts
```

## How to Write a Model

When creating a model, after defining the table in Drizzle, extend the model class from the table you want to create. Then, within the created class, link the table to the model using a declaration such as `static table = userTable`.

```ts
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export class User extends Model {
  static table = usersTable;
  declare id: number;
  declare name: string;
}
```
