---
title: バリデーション
---

# バリデーション

Kosameは`static schema`を設定すると書き込みと読み込み時に自動で検証する機能を提供しています。

## static schema

Kosameには独自のスキーマ定義DSLがなく自ら作る必要があります
Modelに`static schema`(drizzle-zodの`createInsertSchema(table)`)を書いた場合動きます。

```ts
import { createInsertSchema } from "drizzle-zod";

export class User extends Model {
  static table = usersTable;
  static schema = createInsertSchema(usersTable, {
    name: (schema) => schema.min(1),
  });
  declare id: number;
  declare name: string;
}
```

### 検証タイミング

検証タイミングとして書き込み時/読み込み時にバリデーションが走ります。
`add()`/`update()`/`save()`とhydration時`find()`/`reload()`にバリデーションを行います。

### 失敗時

バリデーション失敗時には、例外が投げられて、DB操作/hydrationを停止します。
