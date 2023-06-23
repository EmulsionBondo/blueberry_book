// ジェネリクスとは型引数を受け取る関数を作る機能
const sentence4_4_1 = () => {
    // 関数名の後に <型引数リスト>を付ける
    function repeat<T>(element: T, length: number): T[] {
        const result: T[] = [];
        for (let i = 0; i < length; i++) {
            result.push(element);
        }
        return result;
    }
    console.log(repeat<string>("a", 5));
    console.log(repeat<number>(123, 3));
};

// 関数の型引数を宣言する方法
const sentence4_4_2 = () => {
    // 関数の名前がない場合はfunctionの直後に書く
    const repeat = function <T>(element: T, length: number): T[] {
        const result: T[] = [];
        for (let i = 0; i < length; i++) {
            result.push(element);
        }
        return result;
    }
    // アロー関数式の場合は引数リストの前にいきなり肩引数リストを書く
    const repeat2 = <T>(element: T, length: number): T[] => {
        const result: T[] = [];
        for (let i = 0; i < length; i++) {
            result.push(element);
        }
        return result;
    }
    // メソッド記法の場合もメソッド名の直後
    const utils = {
        repeat<T>(element: T, length: number): T[] {
            const result: T[] = [];
            for (let i = 0; i < length; i++) {
                result.push(element);
            }
            return result;
        }
    }

    // 型引数リストが複数も可能
    const pair = <Left, Right>(left: Left, right: Right): [Left, Right] => [left, right];
    const p = pair<string, number>("uhyo", 26);
    console.log(p);

    // extends やオプショナル型引数も使用可能

    const repeat3 = <T extends { name: string; }>(element: T, length: number): T[] => {
        const result: T[] = [];
        for (let i = 0; i < length; i++) {
            result.push(element);
        }
        return result;
    }
    type HasNameAndAge = {
        name: string;
        age: number;
    }
    console.log(repeat3<HasNameAndAge>({ name: "uhyo", age: 26 }, 3));
    // 以下はエラー
    // console.log(repeat3<string>("a", 5));
};

// 関数の型引数は省略できる
const sentence4_4_3 = () => {
    function repeat<T>(element: T, length: number): T[] {
        const result: T[] = [];
        for (let i = 0; i < length; i++) {
            result.push(element);
        }
        return result;
    }
    // 型引数を省略した場合、型推論によって補われる
    const result = repeat("a", 5);
};

// 型引数を持つ関数型
const sentence4_4_4 = () => {
    // 以下の関数型は <T>(element: T, length: number) => T[] 型
    const repeat = function <T>(element: T, length: number): T[] {
        const result: T[] = [];
        for (let i = 0; i < length; i++) {
            result.push(element);
        }
        return result;
    }
    // 「型引数を持つ関数型」の型を定義する場合は以下のように書く
    type Func = <T>(arg: T, num: number) => T[];
    const repeat2: Func = (element, length) => {
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(element);
        }
        return result;
    }
};

sentence4_4_1();
sentence4_4_2();
sentence4_4_3();
sentence4_4_4();