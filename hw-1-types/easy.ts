export type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

export type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

export type Unshift<ArrayType, Element> = [Element, ...ArrayType[]];

export type MyExclude<T, U> = T extends U ? never : T;

// --------------------- Примеры использования ---------------------

// Проверка MyPick
type User = {
    id: number;
    name: string;
    age: number;
};
const userWithoutAge: MyPick<User, 'id' | 'name'> = {
    id: 1,
    name: 'John',
};
console.log(userWithoutAge);

// Проверка NOfArray
const firstItem: NOfArray<[1], 0> = 1;
console.log(firstItem);

// Проверка Unshift
const unshiftExample: Unshift<number, boolean> = [true, 1, 2, 3];
console.log(unshiftExample);

// Проверка MyExclude
type T = "a" | "b" | "c";
type U = "a";
const excludedExample: MyExclude<T, U> = "b";
console.log(excludedExample);
