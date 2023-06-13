// 01.変数宣言の構文
const sentence1 = () => {
    const greetings = "Hello,";
    const target = "World";
    const text = greetings + " " + target;
    console.log(text);
};

// 02.識別子
// unicode は使えるが、予約語は使えない
const sentence2 = () => {
    const あいう = 123;
    const 技術評論社 = あいう + 876;
    console.log(技術評論社);
    // 以下はエラー
    // const ↑ = 123;
    // const foo bar = 123;

};


// 03. 型注釈
const sentence3 = () => {
    const greetings: string = "Hello,";
    const target: string = "World";
    console.log(greetings + " " + target);
};

// 04. letによる変数宣言と変数への再代入

const sentence4 = () => {
    let greetings = "Hello,";
    let target = "World";
    console.log(greetings + " " + target);
};

const sentence5 = () => {
    // 再代入可能
    let greetings2 = "Hello,";
    greetings2 = greetings2 + "World";
    console.log(greetings2);
};

const sentence6 = () => {
    // 宣言時に値を代入しなくてもいい
    let greetings, target;
    greetings = "Hello,";
    target = "World";
    console.log(greetings + " " + target);
};

const sentence7 = () => {
    // 宣言時に値を代入しなくてもいい
    let greetings: string, target: string;
    greetings = "Hello,";
    // 代入する前に使おうとするとエラー
    // console.log(greetings + " " + target);
};

sentence1();
sentence2();
sentence3();
sentence4();
sentence5();
sentence6();
sentence7();

// letはできるだけ避けて読む人の負担を軽くする