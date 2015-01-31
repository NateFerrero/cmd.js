### `cmd.join(val1, ...)`

| name     | return value              |
|----------|-------------------------- |
| `join`   | `['joined string', ...]`  |

#### Example

The following example joins the values using the glue provided in initial arguments:

```js
cmd.join('-', '+')('a', 'b', 'c');
// ["a-b-c", "a+b+c"]
```
