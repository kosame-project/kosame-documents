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
