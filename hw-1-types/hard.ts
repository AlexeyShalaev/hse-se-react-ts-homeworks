// Camelize

type CamelCase<S extends string> = S extends `${infer Head}_${infer Tail}`
    ? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
    : S;

export type Camelize<T> = {
    [K in keyof T as CamelCase<Extract<K, string>>]: T[K] extends object
    ? Camelize<T[K]>
    : T[K];
};

// DeepPick

type Split<S extends string, Delimiter extends string> =
    S extends `${infer Head}${Delimiter}${infer Rest}`
    ? [Head, ...Split<Rest, Delimiter>]
    : [S];

type DeepPickSingle<T, Keys extends any[]> =
    T extends Array<infer U>
    ? DeepPickSingle<U, Keys>[]
    : Keys extends [infer First, ...infer Rest]
    ? First extends keyof T
    ? { [K in First & keyof T]: DeepPickSingle<T[First], Rest> }
    : never
    : T;

type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

export type DeepPick<T, Paths extends string> = UnionToIntersection<
    Paths extends any
    ? DeepPickSingle<T, Split<Paths, '.'>>
    : never
>;


// --------------------- Примеры использования ---------------------


// Проверка Camelize
interface SnakeCaseExample {
    first_name: string;
    last_name: string;
    user_details: {
        user_id: number;
        user_name: string;
    };
}
const camelizeExample: Camelize<SnakeCaseExample> = {
    firstName: "John",
    lastName: "Doe",
    userDetails: {
        userId: 1,
        userName: "johndoe"
    }
};
console.log(camelizeExample);

// Проверка DeepPick
interface IExample {
    user: {
        id: number;
        profile: {
            name: string;
            age: number;
        };
    };
    posts: {
        id: number;
        content: string;
    }[];
}

const dp: DeepPick<IExample, 'user.profile.name' | 'posts.id'> = {
    user: {
        profile: {
            name: 'John'
        }
    },
    posts: [{ id: 1 }]
};

console.log(dp);
