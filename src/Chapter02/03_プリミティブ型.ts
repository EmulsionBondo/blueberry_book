import { link } from "fs";
import { createInterface } from "readline";

// プリミティブとは
// 文字列、数値、真偽値、BigInt、null、undefined、シンボルのこと

// number型は整数、小数の区別なし
// TypeScriptの数値型（number型）はIEEE 754倍精度浮動小数点数（64ビット）で表現される
// C++とかのdouble型と同じ、64ビット浮動小数点数
// 数値（仮数部）が53ビット、指数部が11ビット、符号部が1ビット
const sentence2_3_2 = () => {
    const width1 = 5;
    const width2 = 8;
    const height: number = 3;
    const area = (width1 + width2) * height / 2;
    console.log(area); // 19.5
}

// 数値リテラル
// リテラル：何らかの値を表す式
const sentence2_3_3 = () => {
    const binary = 0b1010; // 2進数リテラル
    const octal = 0o744; // 8進数リテラル
    const hex = 0xadf0d; // 16進数リテラル
    console.log(binary, octal, hex);

    // 指数表記のリテラル
    const big = 1e8;
    const small = 4e-5;
    console.log(big, small);

    // "_" で桁区切り
    const million = 1_000_000;
    console.log(million);
}

// 任意精度整数（BigInt）
// BigIntリテラルは末尾にnを付ける
const sentence2_3_4 = () => {
    const bignum: bigint = (123n + 456n) * 2n;
    console.log(bignum);

    // bigint と number は演算できない
    // console.log(100n + 5); // エラー
}

// 文字列型と3種類の文字列リテラル
// 文字列リテラルはシングルクォート、ダブルクォート、バッククォートで囲む
const sentence2_3_5 = () => {
    const str1: string = "Hello";
    const str2: string = 'Hello';
    const str3: string = `Hello`;
    console.log(str1, str2, str3);

    // テンプレートリテラルはリテラル中で改行できる
    const message: string = `Hello
    World`;
    console.log(message);

    // 式を文字列に埋め込める
    const str4: string = `Hello`;
    const str5: string = `World`;
    console.log(`${str4}, ${str5}`);
    console.log(`123 + 456 = ${123 + 456}`);
}

// エスケープシーケンス
// \n \tなど
const sentence2_3_6 = () => {
    console.log("Hello \\ World/");

    // Unicodeコードポイントを指定するエスケープシーケンス \u{コードポイント}
    console.log("Hello \u{796d} world!"); // Hello 祭 world!
}

// 真偽値（true/false）と真偽値リテラル
// true/false は値
// 真偽値リテラルは true/false で表現する
const sentence2_3_7 = () => {
    const no: boolean = false;
    const yes: boolean = true;
    console.log(no, yes);
}

// nullとundefined
// null/undefined はそれ自体が値の名前
// nullという種類のプリミティブに属する値はnullのみ、undefinedも同様
const sentence2_3_8 = () => {
    const val1 = null;
    const val2 = undefined;
    console.log(val1, val2);

    // 型アノテーションをつけるときはnull/undefinedを使う
    const n: null = null;
    const u: undefined = undefined;
}

// プリミティブ型同士の変換
// 暗黙の変換
const sentence2_3_9 = () => {

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('文字列を入力してください', (line) => {
        // 文字列が入力されるとここが実行される
        console.log(`${line} が入力されました`);
        rl.close();
    });

}

const sentence2_3_9_2 = () => {

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('数値を入力してください', (num) => {
        // numは文字列型
        console.log(num + 1000);
        rl.close();
    });
}

// 明示的な変換
const sentence2_3_10 = () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("数値を入力してください", (line) => {
        const num = Number(line);
        console.log(num + 1000);
    });

};
// 文字列を入力するとNaNになる
const sentence2_3_10_2 = () => {
    const num1 = Number(true);
    const num2 = Number(false);
    const num3 = Number(null);
    const num4 = Number(undefined);
    console.log(num1, num2, num3, num4);

    // BigIntへの変換は数値・文字列・真偽値から可能
    // NaNに相当する値がないため、変換できないとランタイムエラーになる
    const bigint1 = BigInt("1234");
    const bigint2 = BigInt(500);
    const bigint3 = BigInt(true);
    console.log(bigint1, bigint2, bigint3);

    // const bigint = BigInt("foo");
    // console.log(bigint); // エラー
};

// 文字列への変換
const sentence2_3_10_3 = () => {
    const str1 = String(123);
    const str2 = String(1.23);
    const str3 = String(true);
    const str4 = String(false);
    const str5 = String(null);
    const str6 = String(undefined);
    console.log(str1, str2, str3, str4, str5, str6);
};

sentence2_3_2();
sentence2_3_3();
sentence2_3_4();
sentence2_3_5();
sentence2_3_6();
sentence2_3_7();
sentence2_3_8();
sentence2_3_9();
sentence2_3_9_2();
sentence2_3_10();
sentence2_3_10_2();
sentence2_3_10_3();