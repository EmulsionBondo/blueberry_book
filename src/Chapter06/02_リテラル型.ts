// リテラル型はプリミティブ型をさらに細分化した型
const sentence6_2_1_1 = () => {
    // "foo" という文字列のみが属するリテラル型
    type FooString = "foo";
    // ok
    const fooString: FooString = "foo";
    // ng
    // const bar: FooString = "bar";

    // 文字列のリテラル型
    const foo: "foo" = "foo";
    // 数値のリテラル型
    const one: 1 = 1;
    // 真偽値のリテラル型
    const t: true = true;
    // BigIntのリテラル型
    const three: 3n = 3n;
};

// テンプレートリテラル型
// `Hello, ${string}` という方は `Hello, ${文字列}`の形の文字列を表す型
const sentence6_2_2_1 = () => {
    function getHelloStr(): `Hello, ${string}!` {
        const rand = Math.random();
        if (rand < 0.3) {
            return `Hello, world!`;
        } else if (rand < 0.6) {
            return `Hello, my world!`;
        }
        else {
            return `Hello, your world!`;
        }
        // `Hello, ${string}!` に当てはまらないのでコンパイルエラー
        // else if (rand < 0.9) {
        //     return `Hello, world.`;
        // } else {
        //     return `Hell, world!`;
        // }
    }

    // テンプレート文字列リテラルからテンプレートリテラル型を型推論してもらうこともできる
    function makeKey<T extends string>(userName: T) {
        return `user:${userName}` as const;
    }
    // "user:uhyo"
    const uhyoKey = makeKey("uhyo");
};

// ユニオン型とリテラル型を組み合わせて使うケース
const sentence6_2_3_1 = () => {
    // リテラル型のユニオン型を作るパターンが頻出
    // true | falseでもいいが、文字列のほうがコードを見てわかりやすい
    function signNumber(type: "plus" | "minus") {
        return type === "plus" ? 1 : -1;
    }

    console.log(signNumber("plus"));
    console.log(signNumber("minus"));
    // コンパイルエラー
    // console.log(signNumber("a"));
};

// リテラル型のwidening
// リテラル型が自動的に対応するプリミティブ型に変化する（広げられる）挙動
const sentence6_2_4_1 = () => {
    // "uhyo"型
    const uhyo1 = "uhyo";
    // let で代入するとstring型になる
    let uhyo2 = "uhyo";

    // オブジェクトリテラルの中
    // {name: string, age: number}型となっている
    const uhyo = {
        // 後から書き換え可能であると考えられる
        name: "uhyo",
        age: 30,
    };
};

// wideningされるリテラル型・されないリテラル型
const sentence6_2_5_1 = () => {
    // される
    const uhyo1 = "uhyo";
    const uhyo2: "uhyo" = "uhyo";

    // string型
    let uhyo3 = uhyo1;
    // "uhyo"型
    let uhyo4 = uhyo2;
};

sentence6_2_1_1();
sentence6_2_2_1();
sentence6_2_3_1();
sentence6_2_4_1();