### cmd.logger

| name       | return value    | description   |
|------------|-----------------|---------------|
| `logger`   | `[mixed, ...]`  | Logs values once per each argument and passes them through unchanged. |

The following example logs each value wrapped in a custom log format to the console and returns the values. If a string is passed it will use `cmd.format` to format the logs:

```js
var withDate = function (x) {
    return 'Log at ' + (new Date()) + ': ' + x;
};
cmd.logger(withDate, 'and the number is: {}').with(1, 2, 3);
// Log at Sat Jan 31 2015 23:05:59 GMT-0800 (PST): 1 and the number is: 1
// Log at Sat Jan 31 2015 23:05:59 GMT-0800 (PST): 2 and the number is: 2
// Log at Sat Jan 31 2015 23:05:59 GMT-0800 (PST): 3 and the number is: 3
// [1, 2, 3]
```
