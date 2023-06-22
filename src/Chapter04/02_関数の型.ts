// TypeScriptでは関数も値なので、関数を表す型（関数型）がある
// 関数型の記法
const sentence4_2_1 = () => {
    // xRepeatの型は (num: number) => string
    // （引数リスト）=> 返り値の型　という記法
    const xRepeat = (num: number): string => "x".repeat(num);

    // 「引数を受け取らず返り値がない関数」の型は () => void と書ける
    // 「0個以上の任意の数の数値を受け取って数値を返えす関数」の型は (...args: number[]) => number と書ける
    // 関数型も型の一種なので、type文で別名を付けたり、型注釈に使うことができる
    type F = (repeatNum: number) => string;
    const xReapeat2: F = (num: number): string => "x".repeat(num);

    // 関数型も型チェックができる
    type F2 = (arg: string, arg2: string) => boolean;
    // F2と (num: number) : void は型が違うためエラー
    // const fun: F2 = (num: number): void => console.log(num);

    // 関数型の中の引数名の型チェックに影響しない
    // (foo: number) => void と (bar: string) => void は同じ型
    // ただし、エディタの支援機能を充実させるために引数名は書いたほうが良い
};

// 返り値の型注釈は省略可能
// 明記しなかった場合、型推論によって決められる
const sentence4_2_2 = () => {
    // (num: number) => string と推論される
    const xRepeat = (num: number) => "x".repeat(num);

    // 返り値がない場合はvoid型と推論される
    const g = (num: number) => {
        for (let i = 0; i < num; i++) {
            console.log(i);
        }
    };
};

// 返り値の方注釈は省略すべきか
// 利点1. 関数の中身を知らなくても良い状態を作る（型推論やエディタのinlay hintsで薄まりつつある）
// 利点2. 関数内部で返り値の型チェックを働かせられる
const sentence4_2_3 = () => {
    function range(min: number, max: number): number[] {
        const result = [];
        for (let i = min; i <= max; i++) {
            result.push(i);
        }
        return result;
    };

    const arr = range(5, 10);
    for (const value of arr) console.log(value);

    // return文を忘れてしまった場合
    // 返り値がnumber[]型であるが、何も返していないことを検知してくれている
    // function range2(min: number, max: number): number[] {
    //     const result = [];
    //     for (let i = min; i <= max; i++) {
    //         result.push(i);
    //     }
    // }
    // const arr2 = range2(5, 10);
    // for (const value of arr2) console.log(value);

    // 型注釈がない場合
    function range2(min: number, max: number) {
        const result = [];
        for (let i = min; i <= max; i++) {
            result.push(i);
        }
    }
    const arr2 = range2(5, 10);
    // 関数部分ではなく、for-of文でエラーが出る
    // arrはvoid型であり、for-of文で使えないというエラー文が出る
    // for (const value of arr2) console.log(value);
};

// 引数の型注釈が省略可能な場合
// 通常の型推論は式から式自体の方が推論される、という挙動
// 引数の型注釈が省略可能な場合、"逆方向の型推論"が働く
const sentence4_2_4 = () => {
    // xRepeatに代入されている式を見ることで、型が (arg: number) => string と推論される
    const xRepeat = (arg: number): string => "x".repeat(arg);

    // 逆方向の型推論（contextual typing）
    type F = (arg: number) => string;
    // この関数式は引数の型を書かなくてもOK
    // この関数式がF型変数に代入されるということは、この関数式がF型を持っていなければならない
    // Fはnumber型の引数を受け取る関数の型であるため、関数式の引数numはnumber型であると推論される
    // すでにわかっていることを何度も書かなくて良いという機能
    const xRepeat2: F = (num) => "x".repeat(num);

    // 逆方向の推論が働く場面として重要なものとして、関数引数がある
    // コールバック関数は多くの場合引数の型を書かなくても良くなる
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // 引数 x に型注釈がないが、逆方向の推論が働いている
    const arr2 = nums.filter((x) => x % 3 === 0);
    console.log(arr2);

    // 他のパターンとして文脈上の型がオブジェクト型を伝搬してくる場合がある
    type Greetable = {
        greet: (str: string) => string;
    }

    const obj: Greetable = {
        greet: (str) => `Hello ${str}!`
    };

    // 省略できないのに省略した場合コンパイルエラーで教えてくれるので、書かなくてもよいのかどうか迷ったときはとりあえず省略してみる
    // 省略できない場面で省略するとエラーが出る
    // const f = (num) => num * 2;

    // 型注釈を書かなくても良いとき限定の省略記法
    // アロー関数式の引数が1つだけで引数に型注釈がない場合、引数の丸括弧を省略できる
    // より簡潔に書けるようになるが、好んで使用するかどうかは意見が分かれる
    const arr3 = nums.filter(x => x % 3 === 0);
};

// コールシグネチャによる関数型の表現
// オブジェクト型の中で使用できる構文、（引数リスト）: 返り値の型; という形
// コールシグネチャを用いることで「プロパティを持った関数」の型を表現できるようになる
// ただし、あまり使われる機会はない
const sentence4_2_5 = () => {
    // プロパティの定義とコールシグネチャが混在している
    // MyFunc型は「プロパティを持つ」という性質と「関数である」という性質を持つ
    type MyFunc = {
        isUsed?: boolean;
        (arg: number): void;
    };

    const double: MyFunc = (arg: number) => {
        console.log(arg * 2);
    };

    // double はisUsedプロパティを持つ
    double.isUsed = true;
    console.log(double.isUsed);
    // doubleは関数として呼び出せる
    double(1000);
};

sentence4_2_1();
sentence4_2_2();
sentence4_2_3();
sentence4_2_4();
sentence4_2_5();