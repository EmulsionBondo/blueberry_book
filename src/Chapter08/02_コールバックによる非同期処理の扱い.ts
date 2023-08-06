import { readFile } from "fs";
import { Performance } from "perf_hooks";
// 非同期処理を扱う方法の中でもっとも原始的なものがコールバック関数
// コールバック関数は、非同期処理が完了した後に呼び出される関数のこと
const sentence8_2_1 = () => {
    console.log("読み込みを開始します");
    readFile("../../uhyo.txt", "utf-8", (data) => {
        console.log("読み込みが完了しました");
    });
    console.log("読み込みを開始しました");

};

//タイマーの例
const sentence8_2_2 = () => {
    setTimeout(() => {
        console.log("タイマーが呼び出されました");
    }, 3000);
    console.log("タイマーをセットしました");
};

// fsモジュールによるファイル操作の例
const sentence8_2_3 = () => {
    const startTime = performance.now();
    readFile("uhyo.txt", "utf-8", (err, result) => {
        const endTime = performance.now();
        console.log(`${endTime - startTime}ミリ秒かかりました`);
    });
    console.log("読み込み開始");
};

// 同期処理と非同期処理の順序
// 同期的に実行中のプログラムに非同期処理が割り込むことはない
// 同期的に実行中の状態で非同期処理が完了しても、同期的な処理が全部完了してからコールバック関数が呼び出される
const sentence8_2_4 = () => {
    setTimeout(() => {
        console.log("タイマーが呼び出されました");
    }, 100);

    const startTime = performance.now();
    let count = 0;
    while (performance.now() - startTime < 1000) {
        count++;
    }
    console.log(count);
};

// sentence8_2_1();
// sentence8_2_2();
// sentence8_2_3();
sentence8_2_4();