---
title: Relations
---

# Relations

Kosame provides relationship functionality using `hasMany` and `belongsTo`.
The design of these relationships does not use JOIN clauses; instead, it retrieves related records using batch queries with the IN clause.

## How to Establish Relationships

### hasMany()
