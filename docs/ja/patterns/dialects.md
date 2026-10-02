---
title: Dialectごとの注意点（pg / mysql / sqlite / D1）
---

# Dialectごとの注意点（pg / mysql / sqlite / D1）

KosameはDrizzleベースであるためDBの違いまでは吸収仕切れていません。
このページではそれぞれの注意点を触れていきます。

## トランザクション

Postgresql: `db.transaction()`
MySql: `db.transaction()`
SQLite: 生SQLのBEGIN/COMMIT/ROLLBACK (ネスト SAVEPOINT)を手動発行
D1: 生SQLのBEGIN/COMMIT/ROLLBACK (ネスト SAVEPOINT)を手動発行

## context.rawとtxContext.raw

Postgresql: 別の接続
MySql: 別の接続
SQLite: 単一接続
D1: -

## INSERT後の行の取得

Postgresql: `.returning()`
MySql: `$returningId()`で主キーを取って再SELECT
SQLite: `.returning()`
D1: -

## deletedAtColumn()の型

Postgresql: timestamp
MySql: datetime
SQLite: integer
D1: -

## import

Postgresql: kosame/pg
MySql: kosame/mysql
SQLite: kosame/sqlite
D1: -
