const array: number[][] = [
    [1, 2, 3],
    [3, 2, 1],
    [4, 5, 1],
];

//Unique Elements

let distinctElements = new Set<number>();

array.forEach((row: number[]) => {
    row.forEach((column: number) => {
        distinctElements.add(column);
    });
});

console.log(distinctElements);

//Numbers that repeat along with count

let map = new Map<number, number>();

array.forEach((row: number[]) => {
    row.forEach((column: number) => {
        if (map.has(column)) {
            map.set(column, map.get(column)! + 1);
        } else {
            map.set(column, 1);
        }
    });
});

map.forEach((value: number, key: number) => {
    if (map.get(key)! > 1) {
        console.log(key + ": " + map.get(key));
    }
});

//Combine two 2D arrays

const array1: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const array2: number[][] = [
    [3, 2, 1],
    [6, 5, 4],
    [9, 8, 7],
];

const comboArray: number[][] = [...array1, ...array2];
console.log(comboArray);
