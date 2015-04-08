### cmd.gt

| name       | return value    | description   |
|------------|-----------------|---------------|
| `gt`       | `[mixed, ...]`  | Compares argument with values using > operator |

Similar to [cmd.gte](gte.md) but is exclusive; compares values using the > relation.

```js
cmd.gt(1).with(1, 2, 3) // [false, true, true]

cmd.gt(4).with(1, 2, 3) // [false, false, false]
```
