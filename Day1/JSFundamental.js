var array = [
    [1, 2, 3],
    [3, 2, 1],
    [4, 5, 1],
];

//Unique Elements

var distinctElements = new Set();

array.forEach((row) => {
    row.forEach((column) => {
        distinctElements.add(column);
    });
});

console.log(distinctElements);

//Numbers that repeat along with count

var map = new Map();

array.forEach((row) => {
    row.forEach((column) => {
        if (map.has(column)) {
            map.set(column, map.get(column) + 1);
        } else {
            map.set(column, 1);
        }
    });
});

for (var keys of map.keys()) {
    if (map.get(keys) > 1) {
        console.log(keys + ": " + map.get(keys));
    }
}

//Combine two 2D arrays

var array1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
var array2 = [
    [3, 2, 1],
    [6, 5, 4],
    [9, 8, 7],
];

var comboArray = array1.concat(array2);
console.log(comboArray);