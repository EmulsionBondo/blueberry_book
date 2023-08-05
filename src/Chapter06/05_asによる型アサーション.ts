// 前提として型アサーションの使用はできるだけ避けるべき（TypeScriptが保証する型安全性を意図的に破壊する機能）

// 型アサーションは
// 式 as 型という構文でその式の型を強制的に変える機能
// 値の変換とは別で、コンパイラが認識する型だけを変える
const sentence6_5_1_1 = () => {
    // よくない例
    function getFirstFiveLetters(strOrNum: string | number) {
        const str = strOrNum as string;
        return str.slice(0, 5);
    }

    console.log(getFirstFiveLetters("uhyohyohyo"));
    // ランタイムエラー
    // 型アサーションで12345はstring型になるが、値は12345のまま
    // console.log(getFirstFiveLetters(12345));
};

const sentence6_5_1_2 = () => {
    type Animal = {
        tag: "animal";
        species: string;
    };

    type Human = {
        tag: "human";
        name: string;
    };

    type User = Animal | Human;

    function getNamesIfAllHuman(users: readonly User[]): string[] | undefined {
        if (users.every(user => user.tag === "human")) {
            // user.tag === "human" という条件を満たすので usersはすべてHuman型
            // しかし、コンパイラはusersがHuman型であることを推論できない
            // return users.map(user => user.name);

            // そのため、型アサーションを使ってusersをHuman型の配列に変換する
            // users.everyによって Human[]であることが User[]よりも正確であるため、危険な操作は変わらないが型を正しく直すために使っている
            // このような場合でも、as は避けるべきという考え方もあり、
            // その場合 ユーザー定義型ガードを使っても同じように解決できる
            return (users as Human[]).map(user => user.name);
        }
        return undefined;
    }

};

// as const の用法
// 式 as const という構文
// as 型のような危険な機能ではなく、適切に使えばプログラムの安全性を向上させてくれる機能
// 式に対して4つの効果
// 1. 配列リテラルの型推論結果を配列型ではなく、タプル型にする
// 2. オブジェクトリテラルから推論されるオブジェクト型はすべてのプロパティがreadonlyになる
//    配列リテラルから推論されるタプル型もreadonly タプル型になる
// 3. 文字列・数値・BigInt・真偽値リテラルに対してつけられるリテラル型がwideningしないリテラル型になる
// 4. テンプレート文字列リテラルがstring型ではなく、テンプレートリテラル型になる
// 基本的には、式に出てくるリテラルが「変更できないもの」として扱われる
const sentence6_5_2_1 = () => {
    // 3.
    // string[]型
    const names1 = ["uhyo", "john", "taro"];
    // readonly ["uhyo", "john", "taro"]型
    const names2 = ["uhyo", "john", "taro"] as const;

    // Lookup型、typeofキーワードと組み合わせることで名前を表すName型を作ることもできる
    type Name = (typeof names2)[number];

    // as const を使わない場合
    // 同じことを2回書いている
    type Name2 = "uhyo" | "john" | "taro";
    const names: Name[] = ["uhyo", "john", "taro"];
};

sentence6_5_1_1();
sentence6_5_1_2();