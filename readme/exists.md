### cmd.exists

| name       | return value            | description   |
|------------|-------------------------|---------------|
| `exists`   | `[true or false, ...]`  | Checks if each value passed in exists (not null or undefined). |

The following example checks the existence of the values. Only null and undefined count as not existing:

```js
cmd.exists.with(null, undefined, false, '', 0, true);
// [false, false, true, true, true, true]
```
