---
title: The Model Naming Collision
---

# The Model Naming Collision

The name “Model” in Kosame is a commonly used name, so if another library also uses the name “Model,” a naming conflict will occur.

## Timing of Occurrence

In the case of a library that extends the `Model` class, this results in a duplicate identifier error, and you cannot import it into the same file.
In addition, if there is a method named `model()` in another library, confusion may arise at import time between Kosame’s `Model` and the other library’s `model()`, leading to mistakes in the import path or
making the code harder to read.
