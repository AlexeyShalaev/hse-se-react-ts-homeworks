export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type MyCapitalize<T extends string> = T extends `${infer First}${infer Etc}`
    ? `${Uppercase<First>}${Etc}`
    : T;

export type DeepMutable<T> = {
    -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

export type ParseURLParams<StringElem extends string> =
    StringElem extends `${infer _Start}:${infer Param}/${infer Etc}`
    ? Param | ParseURLParams<`/${Etc}`>
    : StringElem extends `${infer _Start}:${infer Param}`
    ? Param
    : never;

// --------------------- Примеры использования ---------------------

// Проверка DeepPartial
type User = {
    id: number;
    name: string;
    age: number;
    address: {
        country: string;
        city: string;
    };
};
// Корректное использование:
const user: DeepPartial<User> = {
    name: "John",
    address: {
        city: "New York"
    }
};
console.log(user);

// Проверка MyCapitalize
type HelloCapitalize = MyCapitalize<"hello">; // "Hello"
const helloCapitalize: HelloCapitalize = "Hello";
console.log(helloCapitalize);

// Проверка DeepMutable
interface ReadonlyUser {
    readonly name: string;
    readonly address: {
        readonly city: string;
        readonly postalCode: number;
    };
}
type MutableUser = DeepMutable<ReadonlyUser>;
// Теперь можно изменять значения:
const mutableUser: MutableUser = {
    name: "John",
    address: {
        city: "New York",
        postalCode: 12345
    }
};
mutableUser.name = "Jane";
mutableUser.address.city = "Los Angeles";
console.log(mutableUser);

// Проверка ParseURLParams
type Params = ParseURLParams<'posts/:id/:user'>; // 'id' | 'user'
const params: Params = 'id';
console.log(params);
