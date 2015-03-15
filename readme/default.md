### cmd.default

| name       | return value            | description   |
|------------|-------------------------|---------------|
| `default`  | `[mixed, ...]`          | Returns the default given in place of missing values. |

The following example replaces null and undefined values with 9:

```js
cmd.default(9).with(1, null, 3)
// [1, 9, 3]
```
