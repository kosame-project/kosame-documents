---
title: Dialectごとの注意点（pg / mysql / sqlite / D1）
---

# Dialectごとの注意点（pg / mysql / sqlite / D1）

KosameはDrizzleベースであるためDBの違いまでは吸収仕切れていません。
このページではそれぞれの注意点を触れていきます。

## トランザクション

| dialect                                 | 内容                                                                   |
| --------------------------------------- | ---------------------------------------------------------------------- |
| PostgreSQL                              | `db.transaction()`                                                     |
| MySQL                                   | `db.transaction()`                                                     |
| SQLite（`better-sqlite3`/`bun:sqlite`） | 生SQLの`BEGIN`/`COMMIT`/`ROLLBACK`（ネストは`SAVEPOINT`）を手動発行    |
| D1                                      | `db.transaction()`（D1が内部の`BEGIN`/`COMMIT`を受け付けるかは未検証） |

`@libsql/client`は非同期ドライバなので、`db.transaction()`に委譲されます。詳しくは[トランザクション](../essential/transactions)を参照してください。

## context.rawとtxContext.raw

| dialect    | 内容                                                         |
| ---------- | ------------------------------------------------------------ |
| PostgreSQL | 別の接続                                                     |
| MySQL      | 別の接続                                                     |
| SQLite     | 単一接続（`txContext.raw`と`context.raw`が同一オブジェクト） |
| D1         | 未確認                                                       |

詳しくは[エスケープハッチ](../essential/raw)を参照してください。

## INSERT後の行の取得

| dialect    | 内容                                     |
| ---------- | ---------------------------------------- |
| PostgreSQL | `.returning()`                           |
| MySQL      | `$returningId()`で主キーを取って再SELECT |
| SQLite     | `.returning()`                           |
| D1         | `.returning()`（SQLiteと同じ）           |

MySQLは、主キーが無いテーブルでは、INSERT後に行を再取得できないため、`add()`が使えません。

## deletedAtColumn()の型

| dialect    | 内容                         |
| ---------- | ---------------------------- |
| PostgreSQL | `timestamp`                  |
| MySQL      | `datetime`                   |
| SQLite     | `integer`（timestampモード） |
| D1         | SQLiteと同じ                 |

## import

| dialect    | 内容            |
| ---------- | --------------- |
| PostgreSQL | `kosame/pg`     |
| MySQL      | `kosame/mysql`  |
| SQLite     | `kosame/sqlite` |
| D1         | `kosame/sqlite` |
