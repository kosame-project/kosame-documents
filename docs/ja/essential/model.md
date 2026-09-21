---
title: Modelの作成
---

# Modelの定義

## Modelについて

KosameにはDrizzleにはないModelの概念があります。これは他のORM、EF-Coreやactive recordなどにあるModelと近いものでこのModelにより設計に近い実装にすることができKosameの主な機能です。

## 作成方法

Kosameにおいて基本的にはModelディレクトリを作成し、そのディレクトリ内に個々のTableを作成していきます

```
src/
└── models/
    └── tables.ts
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
