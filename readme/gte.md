### cmd.gte

| name       | return value    | description   |
|------------|-----------------|---------------|
| `gte`      | `[mixed, ...]`  | Compares argument with values using >= operator |

The compares values using the >= relation

```js
cmd.gte(1).with(1, 2, 3) // [true, true, true]
cmd.gte(3).with(1, 2, 3) // [false, false, true]
```
