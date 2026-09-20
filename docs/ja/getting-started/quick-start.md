---
title: クイックスタート
---

# クイックスタート

KosameではDrizzleをベースとしたデータベースフレームワークです。
Drizzleベースなので既存のシステムを破壊することなくシステムに組み込むことができます。

## Kosameのインストール

<a href="installation.md">About install <-</a>

### bun

```bash
bun add kosame
```

## ドライバーのインストール

### node-postgres

```bash
bun add drizzle-orm@^0.45.2 pg
bun add -D drizzle-kit@^0.45.2 @types/pg
```
