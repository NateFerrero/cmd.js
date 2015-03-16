### cmd.case.*

| name          | return value                   | description   |
|---------------|--------------------------------|---------------|
| `case.lower`  | `['change string case', ...]`  | Convert strings to lower case. |
| `case.title`  | `['Change String Case', ...]`  | Convert strings to title case. |
| `case.upper`  | `['CHANGE STRING CASE', ...]`  | Convert strings to upper case. |

The following example converts strings to lowercase:

```js
cmd.case.lower.with('Hello World!', 'Will Smith here.');
// ["hello world!", "will smith here."]
```
