### cmd.alert

| name     | return value        | description   |
|----------|---------------------|---------------|
| `alert`  | `[undefined, ...]`  | Causes a browser alert for each value passed in. Does nothing in a Node.js environment. |

The following example displays two alerts in sequence:

```js
cmd.alert('Hello World!', 'Will Smith here.');
// two alerts displayed (only in browser)
```
