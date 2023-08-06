// object型・never型
const sentence6_7_1_1 = () => {
    // obuject型：プリミティブ型以外のすべてを表す型
    // {} には "uhyo"や3 などの値を代入可能
    // 本当に「オブジェクトのみ」に制限したい場合は、object型を使う

    // toStringを持つ値の型
    type HasToString = {
        toString: () => string
    }

    function useToString1(value: HasToString) {
        console.log(`value is ${value.toString()}`);
    }

    useToString1({
        toString() {
            return "foo!";
        }
    })
    // プリミティブ型でもおっけー
    useToString1(3.14);

    // プリミティブ型が渡されると都合が悪いという場合はobject型を使う
    function useToString2(value: HasToString & object) {
        console.log(`value is ${value.toString()}`);
    }

    useToString2({
        toString() {
            return "foo";
        }
    });

    // プリミティブ型はエラー
    // useToString2(3.14);
};

// never型
// never型はすべての型の部分型
const sentence6_7_1_2 = () => {
    // never型：当てはまる値が存在しない
    // never型を受け取る関数を作った場合、呼び出すことは不可能（asやanyを使わない限り）
    // never型の値を入手した場合、他の任意の型にあてはめることができる
    function useNever(value: never) {
        // 実際にはこのコードが実行されることはないので何をしてもいい
        // ただし、anyやasを使うと呼び出せてしまうので注意
        const num: number = value;
        const str: string = value;
        const obj: object = value;
        console.log(`value is ${value}`);
    }

    // never型の値を入手する関数は呼び出すことができない
    // useNever({});
    // useNever(3.14);

    // never型を返す関数を作ることは可能
    function thrower(): never {
        throw new Error("not implemented!");
    }

    // 例外が発生した場合、大域脱出をするため変数resultには値が入らない
    const result: never = thrower();
    const str: string = result;
    console.log(str);
};

// 型述語（ユーザー定義型ガード）
// 型の絞り込みを自由に行うための仕組み
// asやanyと同様に、型安全性を破壊する恐れのある機能の一つ
// 引数名 is 型　という構文
// trueを返すと 引数名の値が型である
const sentence6_7_2_1 = () => {
    function isStringOrNumber(value: unknown): value is string | number {
        return typeof value === "string" || typeof value === "number";
    }

    const something: unknown = 123;
    if (isStringOrNumber(something)) {
        // somethingはstring | number型に絞り込まれる
        console.log(something.toString());
    }

    function isStringOrNumber2(value: unknown): boolean {
        return typeof value === "string" || typeof value === "number";
    }
    // boolean 型にするとコンパイルエラーが出る
    // if (isStringOrNumber2(something)) {
    //     // somethingはstring | number型に絞り込まれる
    //     console.log(something.toString());
    // }

    // 実装を間違えてしまっているが、コンパイルエラーが出ない
    function isStringOrNumber3(value: unknown): value is string | number {
        return typeof value === "string" || typeof value === "boolean";
    }


    type Human = {
        type: "Human",
        name: string,
        age: number
    };

    function isHuman(value: any): value is Human {
        if (value == null) return false;
        return (
            value.type === "Human" &&
            typeof value.name === "string" &&
            typeof value.age === "number"
        )
    }
};

// asserts 引数名 is 型　という構文
// 引数の返り値に表れている関数は、実際の返り値の型はvoidになる
// 「関数が無事に終了すれば引数名は型である」という意味
const sentence6_7_2_2 = () => {
    type Human = {
        type: "Human",
        name: string,
        age: number
    };

    // 与えられた型がHumanでないときはエラーを投げる
    function assertHuman(value: any): asserts value is Human {
        if (value == null) {
            throw new Error('Given value is null or undefined');
        }
        if (
            value.type !== "Human" ||
            typeof value.name !== "string" ||
            typeof value.age !== "number"
        ) {
            throw new Error('Given value is not a Human');
        }
    }
};

// 可変長タプル型
// ...配列型 を含んだ形6
const sentence6_7_3_1 = () => {
    type NumberAndStrings = [number, ...string[]];

    const arr1: NumberAndStrings = [1, "uhyo", "hyo", "hyo"];
    const arr2: NumberAndStrings = [25];
    // エラー
    // const arr3: NumberAndStrings = ["uhyo", "hyo"];
    // const arr4: NumberAndStrings = [25, 26, 27];
    // const arr5: NumberAndStrings = [];

    // ...配列型 をタプル型の最初や真ん中に含めることもできる（TypeScript 4.2で追加された機能）
    type NumberStringNumber = [number, ...string[], number];
    const arr6: NumberStringNumber = [1, "uhyo", "hyo", "hyo", 25];
    const arr7: NumberStringNumber = [25, 26];
    // エラー
    // const arr8: NumberStringNumber = [25, "uhyo", "hyo", "hyo"];
    // const arr9: NumberStringNumber = [];
    // const arr10: NumberStringNumber = ["uhyo", "hyo", 25];
    // const arr11: NumberStringNumber = [25, "uhyo", 25, "hyo"];

    // ...配列型はタプル型の中で1回しか使えない
    // オプショナルな要素を ...配列型 よりも後ろで使えない
    // type T1 = [number, ...string[], number, ...string[]];
    // type T2 = [number, ...string[], ...number[], string];
    // type T3 = [number, ...string[], number?];

    // スプレッド構文と似た作用を持っている
    // タプル型や配列型を別のタプル型の中に展開する効果を持つ
    type NSN = [number, string, number];
    type SNSNS = [string, ...NSN, string];
};

// mapped types
// { [P in K]: T } という構文
// Pは型変数名、K, Tは適当な型
// Kはプロパティ名になれる型（string | number | symbol の部分型）
// Kというユニオン型の各構成要素Pに対して、Pというプロパティが型Tを持つようなオブジェクトの型、という意味
const sentence6_7_4_1 = () => {
    type Fruit = "apple" | "orange" | "strawberry";

    // FruitNumbersは
    // {
    // apple: number;
    // orange: Number;
    // strawberry: number;
    // } 型
    type FruitNumbers = {
        [P in Fruit]: number;
    }

    const numbers: FruitNumbers = {
        apple: 3,
        orange: 10,
        strawberry: 20
    };

    // FruitArraysは
    // {
    // apple: "apple"[];
    // orange: "orange"[];
    // strawberry: "strawberry"[];
    // } 型
    type FruitArrays = {
        [P in Fruit]: P[];
    };

    const numbers2: FruitArrays = {
        apple: ["apple", "apple", "apple"],
        orange: ["orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange"],
        strawberry: []
    };
};

// conditional types
// X extends Y ? S : T という構文
// 「XがYの部分型であればS、そうでなければT」という意味
const sentence6_7_5_1 = () => {
    type RestArgs<M> = M extends "string" ? [string, string] : [number, number, number];

    function func<M extends "string" | "number">(
        mode: M,
        ...args: RestArgs<M>
    ) {
        console.log(mode, ...args);
    }

    func("string", "hello", "world");
    func("number", 1, 2, 3);

    // エラー
    // func("string", 1, 2);
    // func("number", "hello", "world");
};

const sentence6_7_6_1 = () => {
    // オブジェクト型を変換するための型
    // T は
    // {
    // readonly name: string;
    // readonly age: number;
    // } 型
    type T = Readonly<{
        name: string;
        age: number;
    }>;

    // U は
    // {
    // name?: string;
    // age?: number;
    // } 型
    type U = Partial<{
        name: string;
        age: number;
    }>;

    // Pick<T, K> は Tというオブジェクト型のうちKで指定した（Kの部分型である）名前のプロパティのみを残したオブジェクト型を表す
    // V は
    // { 
    // age: number;
    // } 型
    type V = Pick<{
        name: string;
        age: number;
    }, "age">;

    // Omit<T, K>
    // Kで指定されたプロパティを除いたオブジェクト型を返す型

    // Extract<T, U>
    // T（普通はユニオン型）の構成要素のうちUの部分型であるもののみを抽出した新しいユニオン型を返す
    type Union = "uhyo" | "hyo" | 1 | 2 | 3;
    // Wは "uhyo" | "hyo" 型
    type W = Extract<Union, string>;

    // Exclude<T, U>
    // Tの構成要素のうちUの部分型であるものを除いた新しいユニオン型を返す
    // Xは 1 | 2 | 3 型
    type X = Exclude<Union, string>;

    // NonNullable<T>
    // Exclude<T, null | undefined> と同じ
};

sentence6_7_1_1();
// sentence6_7_1_2();
sentence6_7_2_1();
sentence6_7_2_2();
sentence6_7_3_1();
sentence6_7_4_1();
sentence6_7_5_1();