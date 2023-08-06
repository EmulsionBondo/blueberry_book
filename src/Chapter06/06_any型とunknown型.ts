// any型
// 型チェックを無効化する型、コンパイルエラーが基本的には出ない
// TypeScriptの型安全性に関する一切の保証をしてくれない
const sentence6_6_1_1 = () => {
    function doWhatever(obj: any) {
        // どんなプロパティでもアクセスできる
        console.log(obj.user.name);
        // どんなメソッドでも呼び出せる
        obj();
        // どんな型でも代入できる
        const result = obj * 10;
        // string型の変数に代入することもできる
        const str: string = obj;
        // number型を要求する関数に渡せる
        useNumber(obj);
        return result;
    }
    // コンパイルエラーは出ないが、ランタイムエラーになる
    doWhatever(3);
    doWhatever({
        user: {
            name: "uhyo"
        }
    });
    doWhatever(() => { console.log("hello"); });

    function useNumber(num: number) {
        console.log(num);
    }

};

// any型の存在理由
// 1. 既存のJavaScriptコードをTypeScriptに移行する際に、型チェックを一時的に無効化するため
//    型注釈が書かれていない関数引数はすべてany型になる（noImplicitAnyを無効）
// 2. TypeScriptの型で表現しきれない有用なJavaScriptのコードをコンパイル可能にするため
// anyが必要だと思っても、先にasやユーザー定義型ガードを検討するべき

// anyに近いが安全なunknown型
// 何でも入れられる型
// unknown型は何が入っているか不明ということをコンパイラが把握している
// そのため、出来ることが制限されている
const sentence6_6_3_1 = () => {
    function doNothing(val: unknown) {
        // unknown型なので、nameプロパティにアクセスする操作はできないというエラーが出る
        // any型とは異なりコンパイル時点でエラーが出る
        // const name = val.name;
        console.log(val);
    }

    // doNothingはどんな値でも渡すことができる
    doNothing(3);
    doNothing({
        user: {
            name: "uhyo"
        }
    });
    doNothing(() => { console.log("hello"); });

    // unknown型の値を使うときは、型の絞り込みを行う必要がある
    function useUnknown(val: unknown) {
        if (typeof val === "string") {
            console.log("val は文字列");
            console.log(val.slice(0, 5));
        } else {
            console.log("val は文字列ではない");
            console.log(val);
        }
    }

    useUnknown("hello");
    useUnknown(null);
};


// sentence6_6_1_1();
sentence6_6_3_1();