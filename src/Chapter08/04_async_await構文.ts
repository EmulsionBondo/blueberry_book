import { read } from "fs";

// Promiseをベースとした非同期処理を扱うための機能
const sentence8_4_1 = () => {
    // async関数の返り値は必ずPromise
    async function get3(): Promise<number> {
        console.log("get3が呼び出されました");
        // return文で返された値が返り値のPromiseの結果となる
        return 3;
    }

    console.log("get3を呼び出します");
    const p = get3();
    p.then(num => {
        console.log(`num is ${num}`);
    });
    // 同期処理に割り込めないので、コールバック関数よりも先に下の行が実行される
    console.log("get3を呼び出しました");

    // async関数の実行中に例外が発生した場合は、asyncの返り値のPromiseが失敗する
    async function fail() {
        throw new Error("例外が発生しました");
    }

    const p2 = fail();
    p2.catch(err => {
        console.log(err);
    });
};

const sentence8_4_2 = () => {
    // await式はasync関数の中で使える構文
    // await 式 と書く
    // 与えられたPromiseの結果が出るまで待つ
    const sleep = (duration: number) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        });
    }

    async function get3() {
        console.log("get3が呼び出されました");
        // awaitで処理が中断され同期処理に戻る
        await sleep(1000);
        console.log("awaitの次に進みました")
        return 3;
    }

    console.log("get3を呼び出します");
    const p = get3();
    // sleep(1000) でPromiseが未解決のため、コールバック関数を登録するだけで何も起きない
    p.then(num => {
        console.log(`num is ${num}`);
    });
    console.log("get3を呼び出しました");
};

const sentence8_4_3 = () => {
    const sleep = (duration: number) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        });
    }

    async function get3() {
        await sleep(1000);
        return 3;
    }

    async function main() {
        // async関数の中では await 式 でPromiseの結果を得ることができる
        const num1 = await get3();
        const num2 = await get3();
        const num3 = await get3();
        return num1 + num2 + num3;
    }

    main().then(result => {
        console.log(`result is ${result}`);
    });
};

const sentence8_4_3_2 = () => {
    async function main() {
        const { readFile, writeFile } = await import("fs/promises");
        const fooContent = await readFile("foo.txt", "utf-8");
        // 2倍にしてbar.txtに書き込む
        await writeFile("bar.txt", fooContent + fooContent);
        console.log("書き込み完了しました");
    }

    main().then(() => {
        console.log("main()が完了しました");
    });
};

// awaitとエラー処理
const sentence8_4_4 = () => {
    // await p でp が失敗したとき await式で例外が発生したという扱い
    // await式に渡されたPromiseはコールバック関数が登録された扱いになる
    async function main() {
        const { readFile, writeFile } = await import("fs/promises");
        // awaitで発生した例外はtry-catchでキャッチできる
        try {
            const fooContent = await readFile("foo.txt", "utf-8");
            await writeFile("bar.txt", fooContent + fooContent);
            console.log("書き込みが完了しました");
        } catch {
            console.log("エラーが発生しました");
        }
    }

    main().then(() => {
        console.log("main()が完了しました");
    });
};

// async関数のいろいろな宣言方法
const sentence8_4_5 = () => {
    // async関数式
    // async function() { ... }
    const main = async function () {
        const { readFile, writeFile } = await import("fs/promises");
        const fooContent = await readFile("foo.txt", "utf-8");
        await writeFile("bar.txt", fooContent + fooContent);
        console.log("書き込みが完了しました");
    };

    // asyncアロー関数式
    const main2 = async () => {
        const { readFile, writeFile } = await import("fs/promises");
        const fooContent = await readFile("foo.txt", "utf-8");
        await writeFile("bar.txt", fooContent + fooContent);
        console.log("書き込みが完了しました");
    };

    // asyncメソッド
    const obj = {
        normalMethod() {
        },
        // async関数のメソッド
        async asyncMethod() {
        },
    }
};

// sentence8_4_1();
// sentence8_4_2();
// sentence8_4_3();
// sentence8_4_3_2();
// sentence8_4_4();
sentence8_4_5();