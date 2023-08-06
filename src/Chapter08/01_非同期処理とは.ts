import { readFile } from "fs";
// 時間がかかる処理、としての非同期処理
// 通信・IO
// APIはブロッキング・ノンブロッキングの2種類
// 非同期はノンブロッキングな処理
const sentence8_1_2 = () => {
    // ブロッキングな処理
    // その処理の実行が完了するまでそこで停止する
    console.log("読み込みを開始します");
    const data = readFile("../../uhyo.txt", "utf-8", (err, data) => {
        console.log(data);
    });
    console.log("読み込みが完了しました");
};

sentence8_1_2();