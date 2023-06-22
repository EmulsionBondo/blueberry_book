// オブジェクトの分割代入
// (1) 基本的なパターン
// 構文 パターン = 式
const sentence3_6_1 = () => {
    const obj = {
        foo: 123,
        bar: true,
    };
    // objのfooプロパティを変数fooに、barプロパティを変数barに代入
    const { foo, bar } = obj;
    // 以下とほぼ同じ
    // const foo = obj.foo;
    // const bar = obj.bar;
};

const sentence3_6_1_2 = () => {
    // プロパティ名と別の名前の変数を使いたい場合
    const obj = {
        foo: 123,
        bar: true,
        "foo bar": false,
    };
    // fooにはobj.foo、barVarにはobj.bar、FooBarにはobj["foo bar"]が代入される
    const {
        foo,
        bar: barVar,
        "foo bar": FooBar,
    } = obj;

    // 分割代入で宣言された変数には型注釈がつけられない（型チェックは行われる）
    const obj2 = {
        str: "hello, world!",
        num: 1234,
    };
    // 存在しないプロパティを指定する場合もエラー
    // const {
    //     foo // fooが存在しない
    // } = obj2;
};

// (2) ネストしたパターン
const sentence3_6_2 = () => {
    const nested = {
        num: 123,
        obj: {
            foo: "hello",
            bar: "world",
        },
    };
    // ネストしたオブジェクトのプロパティを分割代入する
    // パターンの中の　プロパティ: 変数名　に出てくる変数名をパターンに変えることができる
    // その場合は プロパティ: パターン という形になる
    // 変数名の代わりにパターンを書くことが共通
    const { num, obj: { foo, bar } } = nested;
    console.log(num);
    console.log(foo);
};

// 配列の分割代入
// [] で囲まれたパターンを用いる
const sentence3_6_3 = () => {
    const arr = [1, 2, 4, 8, 16, 32];
    // 配列パターンの長さが配列より短い場合は、残りの要素は無視される
    // 配列パターンの長さが配列より長い場合は、残りのパターンにはundefinedが代入される
    const [first, second, third] = arr;
    console.log(first);
    console.log(second);
    console.log(third);

    // ネストも可能
    // obj.arr[0] を foo に代入
    const obj = {
        arr: [1, 2, 3],
    };
    const { arr: [foo] } = obj;
    console.log(foo);

    // 配列パターンの中にオブジェクトパターンを入れることも可能
    // 変数name にarr[0].name が代入される
    // const [{ name }] = arr;

    // 空白を用いて要素をスキップできる
    const [, foo2, , bar, , baz] = arr;
    console.log(foo2);
    console.log(bar);
    console.log(baz);

    // タプル型に対しても配列パターンによる分割代入が可能
    const tuple: [string, number] = ["uhyo", 26];
    const [myName, age] = tuple;
    console.log(myName);
    console.log(age);
};

// 分割代入のデフォルト値
const sentence3_6_4 = () => {
    // オブジェクトパターンや配列パターンにおいて、変数名の後に = 式を付加
    // その変数にundefinedが入るとき 式が評価されて代入される
    // デフォルト値はundefinedのときに限り適用される
    type Obj = { foo?: number };
    const obj1: Obj = {};
    const obj2: Obj = { foo: -1234 };

    // foo に500が代入される
    const { foo = 500 } = obj1;
    console.log(foo);

    // barには-1234が代入される
    const { foo: bar = 500 } = obj2;
    console.log(bar);

    // 分割代入を用いずに書くと以下のようになる
    const foo2 = obj1.foo === undefined ? 500 : obj1.foo;

    // null に対しては何も行わない
    const obj3 = { foo3: null };
    const { foo3 = 123 } = obj3;
    // nullが代入される
    console.log(foo3);

    type Obj2 = { foo4?: number };
    const obj4: Obj2 = {};
    // fooの型はnumber 型
    const { foo4 = 500 } = obj4;
    console.log(foo4);

    // ネストしたパターンに対しても パターン = 式 の形でデフォルト値を指定できる
    type NestedObj = {
        obj?: {
            foo: number
        }
    };
    const nested1: NestedObj = {
        obj: { foo: 123 },
    };
    const nested2: NestedObj = {};

    // 変数foo5には123が代入される
    const { obj: { foo: foo5 } = { foo: 500 } } = nested1;
    console.log(foo5);
    // 変数foo6には500が代入される
    const { obj: { foo: foo6 } = { foo: 500 } } = nested2;
    console.log(foo6);
    // {obj: パターン = 式} の形になっている
};

// restパターンでオブジェクトの残りを取得する
// const { foo, ...restObj} = obj; のように書く
// ...変数名 のように書くと、変数名には残りのプロパティが代入される
const sentence3_6_5 = () => {
    const obj = {
        foo: 123,
        bar: "string",
        baz: false,
    };

    const { foo, ...restObj } = obj;
    console.log(foo);
    console.log(restObj);

    // 配列パターンでも同様にできる
    const arr = [1, 1, 2, 3, 5, 8, 13];
    const [first, second, third, ...restArr] = arr;
    console.log(first);
    console.log(second);
    console.log(third);
    console.log(restArr);
};

sentence3_6_1();
sentence3_6_1_2();
sentence3_6_2();
sentence3_6_3();
sentence3_6_4();
sentence3_6_5();