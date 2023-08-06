import { name, age } from "./uhyo.js";
import { getUhyoName } from "./uhyo.js";

// 変数のエクスポートとインポート
const sentence7_1_1 = () => {
    console.log(name, age);
};

// 関数のエクスポート
const sentence7_1_2 = () => {
    console.log(getUhyoName());
};

// defaultエクスポート、defaultインポート
// 呼び出し側で変数名を自由に決められる
// defaultは使わないほうがいいという意見もある
// defaultエクスポートに対して入力補完が十分に効かない
import uhyoAge from "./uhyoAge.js";
import increment, { value } from "./counter.js";
const sentence7_3_1 = () => {
    console.log(uhyoAge);
    console.log(increment());
    console.log(increment());
    console.log(increment());
};

// 型のインポート・エクスポート
import { Animal, tama } from "./animal.js";
const sentence7_4_1 = () => {
    // export type tama は
    // typeof として使うことができる
    // const myCat: typeof tama = {
    //     species: "cat",
    //     age: 3,
    // };

    const myCat: Animal = {
        ...tama
    };
};

// 一括import
// import * as 変数名 from "モジュール名";

sentence7_1_1();
sentence7_1_2();
sentence7_3_1();
sentence7_4_1();