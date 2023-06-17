import { createInterface } from "readline";

// 算術演算子
// 二項演算子
const sentence2_4_1 = () => {
    const addResult = 1024 + 314 + 500;
    console.log(addResult);
    const discounted = addResult * 0.7;
    console.log(discounted);

    const sqrt2 = 2 ** 0.5;
    console.log(sqrt2);
    console.log(sqrt2 - 1);

    console.log(18 / 12);
    console.log(18n / 12n);
    console.log(18 % 12);
    console.log(18n % 12n);
};

// 単項演算子
const sentence2_4_2 = () => {
    const x = 123;
    const minusx = -x;
    console.log(minusx);
    // + string型に使うことですnumber型に変換する
    // Number(str)のほうが推奨されている
    const str: string = "123";
    console.log(+str * 100);
};

// 文字列の結合を + 演算子で
const sentence2_4_3 = () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('文字列を入力してください', (name) => {
        console.log("こんにちは" + name + "さん");
        rl.close();
    });

    // 片方が文字列型であれば、もう片方も文字列型に変換される
    console.log("foo" + true);
    console.log(null + "bar");
};

// 比較演算子と等価演算子
const sentence2_4_4 = () => {
    // 大小比較
    const left1 = -5;
    const right1 = 0;
    console.log(left1 < right1);

    const left2 = 100n, right2 = 50n;
    console.log(left2 >= right2);

    const left3 = -10, right3 = 0;
    console.log(left3 > right3);

    const left4 = 12n, right4 = 8n;
    console.log(left4 <= right4);

    // 文字列の大小比較(辞書順)
    console.log("apple" < "orange");
};

// 一致判定
const sentence2_4_4_2 = () => {

    const left: number = 1;
    const right: number = 2;
    console.log(left === right);
    console.log(left !== right);

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('パスワードを入力してください', (password) => {
        if (password === "hogehoge") {
            console.log('ようこそ！');
        } else {
            console.log("誰？");
        }
        rl.close();
    });

};

const sentence2_4_4_3 = () => {
    // == と != は基本的に使うべきではない
    // === のほうが厳密に一致判定できる
    // == は暗黙の型変換がされる（===　は両オペランドが違う型であればfalse）
    const str: any = "3";
    console.log(str == 3);
    console.log(str === 3);
};

// 論理演算子
// 真偽値の演算
const sentence2_4_5 = () => {
    const t = true, f = false;

    console.log(t && t);
    console.log(t && f);
    console.log(f && t);

    console.log(t || t);
    console.log(f || t);
    console.log(f || f);

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('数値を入力してください', (line) => {
        const num = Number(line);
        if (0 <= num && num < 100) {
            console.log(`${num}は0以上100未満です`);
        } else {
            console.log(`${num}は0以上100未満ではありません`);
        }
        if (!Number.isNaN(num)) {
            console.log(`${num}はNaNではありません`);
        }
        rl.close();
    });

};

// 一般系と短絡評価
// ! はオペランドを真偽値に変換してから反転する
// !!式 は式を真偽値に変換した結果と一致する
const sentence2_4_6 = () => {
    const input1 = "123", input2 = "";
    const input1isNotEmpty = !!input1;
    console.log(input1isNotEmpty);
    const input2isNotEmpty = !!input2;
    console.log(input2isNotEmpty);

    // x && y はxを真偽値に変換した結果がtrueならばyを評価した結果を返す
    // "foo" && "bar" は "bar" を返す
    // 0 && 123 は 0 を返す

    // x || y はxを真偽値に変換した結果がtrueならばxを評価した結果を返す
    // "foo" || "bar" は "foo" を返す
    // 0 || 123 は 123 を返す
    // || はデフォルト値を簡単に各種法として使われている
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('名前を入力してください', (name) => {
        const displayName = name || "名無し";
        console.log(`こんにちは、${displayName}さん`);
        rl.close();
    });

    // ?? は左辺がnullまたはundefinedならば右辺を返し、そうでなければ左辺を返す
    // データがない場合に大体の値を使う、という場合に適している

    // 環境変数SECRETを取得、なければデフォルト値を使う
    const secret = process.env.SECRET ?? "default";
    console.log(`secretは${secret}です`);
};

// 条件演算子
// if文は文であり、条件演算子は式
// 条件式 ? 真のときの式 : 偽のときの式
const sentence2_4_7 = () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('数値を入力してください', (line) => {
        const num = Number(line);
        const message = 0 <= num && num < 100 ? `${num}は0以上100未満です` : `${num}は0以上100未満ではありません`;
        console.log(message);
        rl.close();
    });
};

// 代入演算子
const sentence2_4_8 = () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('名前を入力してください', (name) => {
        if (name == "") {
            name = "名無し";
        }
        console.log(`こんにちは、${name}さん`);
        rl.close();
    });

    let num = 0;
    num += 100;
    num *= 4;
    num -= 200;
    num /= 2;
    num **= 0.5;
    console.log(num);
};

// ビット演算子
const sentence2_4_9 = () => {
    console.log(0b0101 | 0b1100);
    console.log(0b0101 & 0b1100);
    console.log(~0b0101);
};

sentence2_4_1();
sentence2_4_2();
sentence2_4_3();
sentence2_4_4();
sentence2_4_4_2();
sentence2_4_4_3();
sentence2_4_5();
sentence2_4_6();
sentence2_4_7();
sentence2_4_8();
sentence2_4_9();