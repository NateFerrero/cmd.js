### cmd.compare

| name       | return value    |
|------------|-----------------|
| `compare`  | `-1 or 0 or 1`  |

Compare is a unique command in that it only accepts 2 values. Any further values will be ignored. It is used internally for `cmd.sort` but available for custom sorting as well. It defines a sort order for any two JavaScript types:

#### Example

The following example compares two values.

```js
cmd.compare(8, 5);
// 3

cmd.compare(1000, 'a');
// -1

cmd.compare('boo', 'apple');
// 1

cmd.compare('hello', false);
// 1
```
