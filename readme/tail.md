### cmd.tail

| name     | return value              | description   |
|----------|---------------------------|---------------|
| `tail`   | `[1, ...]`  | Returns last number of values. |

The following example returns the last two values of initial arguments provided.

```js
cmd.tail(2).with(1, 2, 3);
// [2, 3]
```
