---
title: Modelの定義
---

# Modelの定義

## Modelについて

KosameにはDrizzleにはないModelの概念があります。これは他のORM、EF Coreやactive recordなどにあるModelと近いものでこのModelにより設計に近い実装にすることができKosameの主な機能です。

## 作成方法

Kosameにおいて基本的にはModelディレクトリを作成し、そのディレクトリ内に個々のTableを作成していきます

```
src/
└── models/
    └── user.ts
```

### Modelの書き方

Modelの作成においてDrizzleのTable定義をした後、作りたいTableに対しModelクラスをextendさせます、そして作成したクラス内に `static table = userTable` のようにTableとModelを紐づけます。

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

### 二重定義に見える方へ

上の章での定義が冗長のように感じる方は下記の書き方をお勧めします。
DrizzleのInferSelectModelを使い作成したTableから型を取得作成したクラスに持たせることで、冗長さを解決することができます。

```ts
import { InferSelectModel } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export interface User extends InferSelectModel<typeof usersTable> {}
export class User extends Model {
  static table = usersTable;
}
```

## declareを書く理由

Modelを作成する時にクラス内にdeclareで宣言することがあります。
declareがトランスパイラ時に消えてしまいます。これでは宣言の意味がないように思われますがdeclareの代わりに`name : string = ""`のように書いてしまうとトランスパイラ後に初期値として存在する可能性があります。これはKosameの実行時に自動で値が入ると衝突する可能性があるためdeclareで宣言し、あえてトランスパイラ時に消し、衝突を回避します。

## newで直接作成できない理由

Model作成時、newで直接作成できません。
なぜnewの宣言ができないかとこれはKosameのContextベースという考えがあります。
Kosameは基本的にActive recordなどのModelで全て書いてしまうという考えを捨てておりContextを必ず経由させていますnewで作成してしまうとContext経由し生成ということができずContextベースを維持するためnewでの作成ができません
