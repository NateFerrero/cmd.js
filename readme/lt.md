### cmd.lt

| name       | return value    | description   |
|------------|-----------------|---------------|
| `lt`       | `[mixed, ...]`  | Compares argument with values using < operator |

Similar to [cmd.lte](lte.md) but is exclusive; compares values using the < relation.

```js
cmd.lt(1).with(1, 2, 3) // [false, false, false]

cmd.lt(3).with(1, 2, 3) // [true, true, false]
```
