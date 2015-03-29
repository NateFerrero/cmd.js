### cmd.head

| name     | return value              | description   |
|----------|---------------------------|---------------|
| `head`   | `[1, ...]`  | Returns first number of values. |

The following example returns the first two values of initial arguments provided.

```js
cmd.head(2).with(1, 2, 3);
// [1, 2]
```
