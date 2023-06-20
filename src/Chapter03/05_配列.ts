// TypeScriptでは配列はオブジェクトの一種
// 配列リテラルで作成する
const sentence3_5_1 = () => {
    // 配列リテラル
    const arr = [0, 123, -456 * 100];
    console.log(arr);

    // TypeScriptにおいては、複数種類の型を同時に入れても良い
    const arr2 = [100, "文字列", false];
    console.log(arr2);

    // スプレッド構文も利用可能
    const arr3 = [4, 5, 6]
    /// ...式 構文で式が配列だった場合、その位置に要素をすべてコピー
    const arr4 = [1, 2, 3, ...arr3];
    console.log(arr4);
};

// 配列の要素にアクセス
const sentence3_5_2 = () => {
    const arr = [0, 123, -456 * 100];
    // arr の 0 という名前のプロパティの値
    // プロパティ名は文字列であるが、arr["0"]はエラーになる（JavaScriptでは正しい）
    console.log(arr[0]);
    console.log(arr[1]);

    // const で書いているが、配列の要素は変更可能（オブジェクトと同様）
    console.log(arr);
    arr[1] = 5400;
    console.log(arr);
};

// 配列型の記法
// 配列の型は 型[] という形で表現する
const sentence3_5_3 = () => {
    // number型の値を持つ配列
    const arr: number[] = [1, 10, 100];
    // 以下はエラー
    // const arr2: string[] = [123, -456];

    // ユニオン型を使うことで、異なる方を持つ配列を作成できる
    // (number | string | boolean)[] 型
    const arr2 = [100, "文字列", false];
};

// readonly 配列型
// 読み取り専用配列型（内容を書き換えられない）
// readonly T[] のように書く
const sentence3_5_4 = () => {
    const arr: readonly number[] = [1, 2, 3];
    // 要素を変更しようとするとエラー
    // arr[1] = -500;
};

// 配列の機能
const sentence3_5_5 = () => {
    // push メソッド
    const arr = [1, 10, 100];
    arr.push(1000);
    console.log(arr);

    // 以下はエラー
    // arr.push("1000");

    // readonly number[] 型の配列に対してはエラー
    const arr2: readonly number[] = [1, 2, 3];
    // arr2.push(1000);

    // include メソッド（readonly型でも使える）
    console.log(arr.includes(10));
    console.log(arr.includes(50));

    // length プロパティ
    console.log(arr.length);
    arr.push(10000);
    console.log(arr.length);
};

// for-of 文によるループ
// for (const 変数 of 式) 文
const sentence3_5_6 = () => {
    const arr = [1, 2, 3];
    for (const elm of arr) {
        console.log(elm);
    }

    // elmを書き換えても arrの要素には影響しない
    for (let elm of arr) {
        elm *= 10;
        console.log(elm);
    }
    console.log(arr);
};

// タプル型
// 要素数が固定された配列型
// [number, string] のように書くと0番目の要素がnumber型、1番目の要素がstring型となる
// TypeScriptにおいては、タプル型は配列型の一種
const sentence3_5_7 = () => {
    let tuple: [string, number] = ["foo", 0];
    tuple = ["aiueo", -555];

    const str = tuple[0];
    const num = tuple[1];
    // エラー
    // const nothing = tuple[2];

    // タプル型は各要素に名前をつけない
    // ただし、ラベル付きタプル型もある
    // 識別子: という構文で名前をつけることができる
    type User = [name: string, age: number];
    const uhyo: User = ["uhyo", 26];
    console.log(uhyo[1]);

    // 読み取り専用のタプル型
    // readonly [string, number] のように書く

    // オプショナルな要素を持つタプル型
    // [string, number, string?] のように書く
    // 3番目の要素はあってもなくても良い
};

sentence3_5_1();
sentence3_5_2();
sentence3_5_3();
sentence3_5_4();
sentence3_5_5();
sentence3_5_6();
sentence3_5_7();