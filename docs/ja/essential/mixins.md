---
title: Mixins
---

# Mixins

KosameではMixin機構自体の独自実装はしておらず、素のTypeScriptのMixin関数パターンを使用し実現します。

## Mixinsの仕組み

### TypeScriptのMixin

Kosame独自のmixin機構自体の独自実装されておらず、typeScriptのMixinパターンがそのまま使うことができます。

### `Constructor<T>`

kosameでは`Constructor<T>`という型を提供しており、Modelとの噛み合わせをさせるために専用の型を提供してこの問題を解決しています。
自分でMixinを書く時にはこの型を使う必要があります。

## SoftDeletable
