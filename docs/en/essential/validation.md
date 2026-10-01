---
title: Validation
---

# Validation

When you configure a `static schema` in Kosame, it automatically validates data during both write and read operations.

## static schema

Kosame does not have its own schema definition DSL, so you'll need to create one yourself.
If you write a `static schema` (drizzle-zod's `createInsertSchema(table)`) in the Model, it will work.
