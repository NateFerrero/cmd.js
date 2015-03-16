### cmd.log

| name    | return value    | description   |
|---------|-----------------|---------------|
| `log`   | `[mixed, ...]`  | Logs values and passes them through unchanged. |

The following example logs each value to the console and returns the values:

```js
cmd.log.with(1, 2, 3);
// 1
// 2
// 3
// [1, 2, 3]
```
