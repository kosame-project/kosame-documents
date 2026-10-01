---
title: Escape Hatch
---

# Escape Hatch (context.raw)

For implementations that cannot be fully expressed in Kosame, we use an escape hatch.
The escape hatch allows you to write drizzle code directly.

## context.raw

EscapeHatch calls `context.raw` and then writes the drizzle code.

```ts
context.raw.select().from(userTable).where(eq(userTable.name, "kosame"));
```

### Return Value
