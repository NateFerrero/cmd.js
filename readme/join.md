### cmd.join

| name     | return value              |
|----------|-------------------------- |
| `join`   | `['joined string', ...]`  |

Joins values provided with arguments as glue.

#### Example

The following example joins the values using the glue provided in initial arguments:

```js
cmd.join('-', '+')('a', 'b', 'c');
// ["a-b-c", "a+b+c"]
```
