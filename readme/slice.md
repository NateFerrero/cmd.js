### cmd.slice

| name     | return value              | description   |
|----------|---------------------------|---------------|
| `slice`   | `[1, ...]`  | Returns a section of an array. |

The following example returns selected elements starting at the given start argument, and end at, but does not include, the given end argument.

```js
cmd.slice(1, 3).with(1, 2, 3);
// [2, 3]
```
