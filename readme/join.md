### cmd.join

| name     | return value              | description   |
|----------|---------------------------|---------------|
| `join`   | `['joined string', ...]`  | Joins values provided with arguments as glue. |

The following example joins the values using the glue provided in initial arguments:

```js
cmd.join('-', '+').with('a', 'b', 'c');
// ["a-b-c", "a+b+c"]
```
