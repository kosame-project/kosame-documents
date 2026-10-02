---
title: Model Field Declarations
---

# Model Field Declarations

In Kosame, there are two ways to declare a model.
On this page, we’ll explain why we’ve provided two declaration methods and discuss the characteristics of each.

## declare

One way to declare models is to write `declare` statements one by one.
This approach makes the declarations easier to read, but it also involves duplicate definitions.
The fact that the declarations are easier to read is relative to declaration merging; this method allows you to write code in a way that feels more intuitive than declaring and merging `interface` and `class` definitions.
Since this feature might be confusing for those unfamiliar with declaration merging, we’ve provided guidelines on how to write `declare` statements.

```ts
import { Model } from "kosame";

export class User extends Model {
  static table = userTable;
  declare id: number;
  declare name: string;
}
```
