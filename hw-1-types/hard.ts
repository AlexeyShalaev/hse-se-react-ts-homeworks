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

type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}`
    ? [T, ...Split<U, D>]
    : [S];

type DeepPickHelper<T, K extends any[]> =
    K extends [infer First, ...infer Rest]
    ? First extends keyof T
    ? Rest extends []
    ? T[First]
    : DeepPickHelper<T[First], Rest>
    : never
    : never;

type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

export type DeepPick<T, Paths extends string> = {
    [P in keyof T as P extends Split<Paths, '.'>[0]
    ? P
    : never]: P extends keyof T
    ? DeepPickHelper<T[P], Tail<Split<Paths, '.'>>>
    : never;
};

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
