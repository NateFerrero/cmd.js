### cmd.gte

| name       | return value    | description   |
|------------|-----------------|---------------|
| `lte`      | `[mixed, ...]`  | Compares argument with values using =< operator |

The complement of cmd.gte; compares values using the =< relation.

```js
cmd.lte(1).with(1, 2, 3) // [true, false, false]

cmd.lte(3).with(1, 2, 3) // [true, true, true]
```
