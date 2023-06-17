import { createInterface } from "readline";

// オブジェクトは、一言でいうと連想配列
// { } オブジェクトリテラル
// プロパティ名: 式
// プロパティアクセス 式.プロパティ名 でアクセス
const sentence3_1_1 = () => {
    const obj = {
        foo: 123,
        bar: "Hello, world",
    };
    console.log(obj.foo);
    console.log(obj.bar);
};

// オブジェクトリテラル （正式にはオブジェクト初期化子）
// 基本的な構文
// ブロックとの区別は、文の位置に書いてあるか、式の位置に書いてあるか
const sentence3_1_2 = () => {
    // 最後の要素の後ろにカンマがあってもエラーにならない
    const obj = {
        foo: 555,
        bar: "文字列",
    };

    // 式なので条件演算子も使える
    const input = "";
    const user = {
        name: input ? input : "名無し",
        age: 20,
    }

    // 省略記法
    // プロパティ名と同じ変数名である場合は、プロパティ名を省略できる
    const name = "太郎";
    const user2 = {
        name,
        age: 20,
    };
};

// プロパティ名の種々の指定方法
// 識別子以外にも、文字列リテラル、数値リテラルなども使える
const sentence3_1_3 = () => {
    const obj = {
        "foo": 123,
        "foo bar": -500,
        "↑↓↑↓": "",
    };
    console.log(obj.foo);
    // 識別子以外は. ではアクセスできず、[] でアクセスする
    console.log(obj["foo bar"]);
    console.log(obj["↑↓↑↓"]);

    // 数値リテラル
    // 数値リテラルの場合でも、プロパティ名は文字列
    // 1e3: hoge とした場合、プロパティ名は "1000" となる
    const obj2 = {
        1: "one",
        2.05: "two point o five",
    };
    console.log(obj2[1]);
    console.log(obj2[2.05]);

    // 計算されたプロパティ名（動的にプロパティ名を決める）
    // プロパティ名に[式]という構文を使うと、式の結果を文字列としてプロパティ名にできる
    const propName = "foo";
    const obj3 = {
        [propName]: 123,
    };
};

// プロパティアクセス：値の取得と代入

const sentence3_1_4 = () => {
    const user = {
        name: "uhyo",
        age: 25,
    };
    user.age = 26;
    console.log(user.age);

    // 式１[式2] という構文でアクセスすると、プロパティ名を動的に決めることができる
    // [] の中身は文字列型が原則、number型も可能

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const message = {
        good: "0以上の数値が入力されました",
        bad: "負の数値が入力されました",
    };

    rl.question("数値を入力してください。", (line) => {
        const num = Number(line);
        console.log(num >= 0 ? message.good : message.bad);
        rl.close();
    });
};

// スプレッド構文
// ...式 という形でプロパティ:式　の代わりに使用できる
// この構文で行われるのはプロパティのコピー
const sentence3_1_5 = () => {
    const obj1 = {
        bar: 456,
        baz: 789,
    };

    const obj2 = {
        foo: 123,
        ...obj1,
    };
    console.log(obj2);

    // スプレッド構文と通常のプロパティ宣言が同じプロパティを与える場合
    // あとに書かれているプロパティが優先される
    const obj3 = {
        ...obj2,
        foo: -9999,
    };
    console.log(obj3);

    // ...obj2より前にfoo:-9999を書くのはエラー
    // ...obj1によってfooが上書きされてしまうため
    // const obj4 = {
    //     foo: -9999,
    //     ...obj2,
    // };

    // スプレッド構文は1つのオブジェクトリテラルの中で複数回使うことができる
    const obj5 = {
        foo: 123,
        bar: 456,
    };
    const obj6 = {
        bar: -999,
        baz: -9999,
    };
    const obj7 = {
        ...obj5,
        ...obj6,
    };
    console.log(obj7);
}

// オブジェクトはいつ"同じ"か
// TypeScriptではオブジェクトが暗黙にコピーされることはない
// 複数の変数に同じオブジェクトが入る場合がある
// 変数はオブジェクトそのものというよりもオブジェクトへの参照
// 明示的にコピーしなければ同じオブジェクト
const sentence3_1_6 = () => {
    const foo = { num: 1234 };
    const bar = foo;
    console.log(bar.num);
    bar.num = 0;
    console.log(foo.num); // foo.numも0になる
};

// オブジェクトのコピー
const sentence3_1_6_2 = () => {
    // スプレッド構文を使う場合
    const foo = { num: 1234 };
    const bar = { ...foo };
    console.log(bar.num);
    bar.num = 0;
    console.log(foo.num); // foo.numは0にならない
};

// オブジェクトの中にオブジェクトがある場合は、そのオブジェクトは同じオブジェクト
const sentence3_1_6_3 = () => {

    const foo = { obj: { num: 1234 } };
    const bar = { ...foo };
    bar.obj.num = 0;
    console.log(foo.obj.num); // foo.obj.numも0になる
};

// 一致判定
const sentence3_1_6_4 = () => {
    const foo = { num: 1234 };
    const bar = foo;
    const baz = { num: 1234 };

    console.log(foo === bar); // true
    console.log(foo === baz); // false
};

sentence3_1_1();
sentence3_1_2();
sentence3_1_3();
sentence3_1_4();
sentence3_1_5();
sentence3_1_6();
sentence3_1_6_2();
sentence3_1_6_3();
sentence3_1_6_4();