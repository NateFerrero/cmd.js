### cmd.not

| name       | return value            | description   |
|------------|-------------------------|---------------|
| `not`      | `[true or false, ...]`  | Returns the logical inverse of each value. Note: only null, false, and undefined have a logical inverse of true. All other values return false. |

The following example returns the logical inverse of each value:

```js
cmd.not.with(null, undefined, false, '', 0, true);
// [true, true, true, false, false, false]
```
