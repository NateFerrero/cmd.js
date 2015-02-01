### cmd.clone

| name     | return value    | description   |
|----------|-----------------|---------------|
| `clone`  | `[mixed, ...]`  | Clone any JavaScript variable not containing a circular reference. |

The following example clones an object:

```js
var answer = {data: 42};
var cloned = cmd.clone.raw(answer); // raw returns non-wrapped first response

[cloned === answer, cloned.data === answer.data];
// [false, true]
```
