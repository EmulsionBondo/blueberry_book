// オブジェクト型の記法
const sentence3_2_1 = () => {
    // obj の型は { foo: number; bar: string; } と推論される
    const obj = {
        foo: 123,
        bar: "Hello, world",
    };
};

// 型注釈を使った記法
const sentence3_2_1_2 = () => {
    // { } の中に プロパティ名: 型 という宣言を並べる
    // number型のfooプロパティとstring型のbarプロパティを持つオブジェクト型
    const obj: {
        foo: number;
        bar: string;
    } = {
        foo: 123,
        bar: "Hello, world",
    };

    // プロパティ名にはオブジェクトリテラルと同様に文字列リテラルを使える
    const obj2: {
        "foo bar": number;
    } = {
        "foo bar": 123,
    };
};

// オブジェクト型の型チェックと安全性
const sentence3_2_2 = () => {
    // barプロパティがstring型でないため、型エラー
    // const obj: {
    //     foo: Number;
    //     bar: String;
    // } = {
    //     foo: 123,
    //     bar: true,
    // };

    // 宣言されているプロパティを持っていないオブジェクトを代入しようとするとエラー
    // barが宣言されているのに、barがないオブジェクトを代入しようとしているためエラー
    // const obj: {
    //     foo: number;
    //     bar: string;
    // } = {
    //     foo: 123,
    // }

    // プロパティへの代入も型チェックの対象
    // 型が違う値を代入しようとするとエラー
    // const obj = {
    //     foo: 123,
    //     bar: "Hello, world",
    // }
    // obj.bar = true;

    // 宣言されていないプロパティにアクセスしようとするとエラー
    // const obj = {
    //     foo: 123,
    //     bar: "Hello, world",
    // }
    // console.log(obj.hoge);
};

// type文で型に別名をつける
// type 型名 = 型;
const sentence3_2_3 = () => {
    // type文で FooBarObj という名前の型を定義
    // FooBarObj は { foo: number; bar: string; } という型
    type FooBarObj = {
        foo: number;
        bar: string;
    };
    const obj: FooBarObj = {
        foo: 123,
        bar: "Hello, world",
    };
};
// type文型名の作成をその型名を使うより後でも可能
// 型チェックはコンパイル時に行われ、実施のプログラムの実行とは無関係（type文が消える）
const sentence3_2_3_2 = () => {
    const obj: FooBarObj = {
        foo: 123,
        bar: "Hello, world",
    };
    // FooBarObj は { foo: number; bar: string; } という型
    type FooBarObj = {
        foo: number;
        bar: string;
    };

    // プリミティブの型に別名を与えることも可能
    type UserId = string;
    const id: UserId = "uhyo";

    // 作った型に別名をつけることも可能（あまり意味はない）
    type FooObj = { foo: Number; };
    type BarObj = FooObj;
    const obj2: BarObj = { foo: 0 };
};

// interface宣言でオブジェクト型を宣言する
// 型名を新規作成する別の方法
// type は任意の方に対して別名を宣言できるが、interface はオブジェクト型に対してのみ宣言できる
// ほとんどの場合 type文で十分
const sentence3_2_4 = () => {
    interface FooBarObj {
        foo: number;
        bar: string;
    }
    const obj: FooBarObj = {
        foo: 0,
        bar: "string",
    };
};

// 任意のプロパティ名を許容する方（インデックスシグネチャ）
// オブジェクト型の中で使用できる特殊な記法
// どんな名前のプロパティも受け入れるという性質のオブジェクト型を記述できる
// オブジェクト型の中に [キー名: string]: 型; という記法を書く
// 任意の名前のプロパティが型を持つことを表す
const sentence3_2_5 = () => {
    type PriceData = {
        [key: string]: number;
    }
    const data: PriceData = {
        apple: 220,
        coffee: 120,
        bento: 500,
    };

    // data宣言の後も、PriceData型の値を代入できる
    data.chiken = 180;
    // number型以外の値を代入しようとするとエラー
    // data.弁当 = "foo";
};

// インデックスシグネチャの注意点
// TypeScriptが保証する型安全を破壊することができる
const column9 = () => {
    type MyObj = {
        [key: string]: number;
    }
    const obj: MyObj = { foo: 123 };
    const num: number = obj.bar;
    // 存在しないプロパティにアクセスするのは本来はコンパイルエラー
    // それを可能にするのがインデックスシグネチャ
    // 実際にプロパティが存在するかどうかによらず、どんな名前のプロパティにもアクセス出来てしまう
    // 型安全のためにはインデックスシグネチャの使用は避けるべき
    console.log(num); // => undefined

    // 動的なプロパティ名を含むオブジェクトリテラルを用いた場合にも発生する
    const propName: string = "foo";
    // { [x: string]: number } 型 
    const obj2 = {
        [propName]: 123,
    };
    console.log(obj2.foo); // => 123
    // 「何らかのstring型の値」が「任意のstring型の値」に変わっている
    // リテラル型やユニオン型にすればこのような危険を避けることができる

    // オブジェクトを連想配列として使う場合には、インデックスシグネチャを使わず、Mapオブジェクトを使うべき
    // 多くの場合はMapオブジェクトで代替でき、型安全
};

// オプショナルなプロパティの宣言
// あってもなくてもいいプロパティ
// オプショナルなプロパティは、プロパティ名の後ろに ? をつける
const sentence3_2_6 = () => {
    type MyObj = {
        foo: boolean;
        bar: boolean;
        // number | undefined 型（ユニオン型）
        baz?: number;
    };

    const obj: MyObj = { foo: false, bar: true };
    const obj2: MyObj = { foo: false, bar: true, baz: 1234 };

    // オプショナルなプロパティは、存在しない場合は undefined となる
    console.log(obj.baz); // => undefined
    console.log(obj2.baz); // => 1234

    // number | undefined 型の値は number 型と同じようには扱えない（undefinedかもしれない）のでエラー
    // console.log(obj2.baz * 1000);
    // 以下のように条件分岐などでundefinedの可能性を排除するように書く必要がある
    if (obj2.baz !== undefined) {
        console.log(obj2.baz * 1000);
    }
};

// 読み取り専用プロパティの宣言
// readonly 修飾子をつけることでそのプロパティを読み取り専用にする
const sentence3_2_7 = () => {
    type MyObj = {
        readonly foo: number;
    };

    const obj: MyObj = { foo: 123 };
    // obj.foo = 0; // => エラー
};

// typeof キーワードで変数の型を得る
// typeof には2つあり、もう一つはtypeof演算子
// const res: typeof foo = typeof bar;
// typeof foo が今回のtypeofで、typeof bar がtypeof演算子（6.3.2で扱う） 
// typeofを使わずに、type文などで明示的に宣言するほうがわかりやすい
const sentence3_2_8 = () => {
    const num: number = 0;
    // type 文で num の型をTという別名の型として宣言
    type T = typeof num;
    const foo: T = 1;

    // 型推論の結果を型として抽出・再利用したい場合に効果的
    const obj = {
        foo: 123,
        bar: "hi",
    };
    type T2 = typeof obj;
    const obj2: T2 = {
        foo: -50,
        bar: "",
    };
};

sentence3_2_1();
sentence3_2_1_2();
sentence3_2_3();
sentence3_2_3_2();
sentence3_2_4();
sentence3_2_5();
column9();
sentence3_2_6();
sentence3_2_7();
sentence3_2_8();