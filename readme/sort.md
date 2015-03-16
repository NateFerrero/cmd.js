### cmd.sort

| name          | return value    | description   |
|---------------|-----------------|---------------|
| `sort`        | `[mixed, ...]`  | Sorts the array in custom order.     |
| `sort.asc`    | `[mixed, ...]`  | Sorts the array in ascending order.  |
| `sort.desc`   | `[mixed, ...]`  | Sorts the array in descending order. |

The following example sorts the values with various sort orders and parameters:

```js
cmd.sort.asc.with('c', 'a', 'b', 3, 1, 2);
// [1, 2, 3, "a", "b", "c"]

cmd.sort.desc.with('c', 'a', 'b', 3, 1, 2);
// ["c", "b", "a", 3, 2, 1]

// Sort by type, leaving order preserved within a type
cmd.sort(function (x) {
    return typeof x;
}).with('c', 'a', 'b', 3, 1, 2);
// [3, 1, 2, "c", "a", "b"]

// Sort objects by a key
cmd.sort(function (x) {
    return x.price;
}).with(
    {name: 'TV', price: 899.00},
    {name: 'Car', price: 16999.00},
    {name: 'Spoon', price: 1.29}
);
// [
//  {name: "Spoon", price: 1.29},
//  {name: "TV", price: 899},
//  {name: "Car", price: 16999}
// ]
```
