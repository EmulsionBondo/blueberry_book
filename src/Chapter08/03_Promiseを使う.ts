// Promise
// ES2015で追加された非同期処理用の機能
// 非同期処理を行う場合、「終わった後になるをするか」をコールバック関数などで渡す必要がある
// Promiseの場合はコールバック関数を受け取らずPromiseオブジェクトを返し、そのPromiseオブジェクトに終わった後に行う処理関数を登録する

// Promise版fs
import { read } from "fs";
import { readFile } from "fs/promises";

const sentence8_3_1 = () => {
    // Promise<T> という型で、T型の結果を返すPromiseオブジェクトの意味
    const p = readFile("uhyo.txt", "utf-8");
    // Promiseオブジェクトが持つthenメソッドでコールバック関数を渡す
    p.then((data) => {
        console.log(data);
    });
    // Promiseの結果
    // Promiseを作って返す:同期的な処理、結果がまだ決まっていない
    // 非同期処理が完了すると、Promiseに登録される（これをPromiseの結果という言い回し）
    // 結果が決まることをPromiseの解決呼ぶ
    // コールバック関数が呼び出されるとき、引数としてPromiseの結果が渡される

    // 非同期処理の開始タイミング
    // 基本的にはPromiseオブジェクトが返された段階で始まっている
    // thenで呼び出した際に始まるものが採用されることがある
};

// コールバック関数の登録とエラー処理
const sentence8_3_2_1 = () => {
    const p = readFile("uhyo.txt", "utf-8");
    // 1つのPromiseオブジェクトに複数の関数を登録できる
    // Promise解決時に登録順に処理される
    p.then((data) => {
        console.log("1");
    });
    p.then((data) => {
        console.log("2");
    });
    p.then((data) => {
        console.log("3");
    });
};

const sentence8_3_2_2 = () => {
    const p = readFile("uhyo.txt", "utf-8");

    p.then((result) => {
        console.log("成功", result);
    });
    // Promiseの解決に失敗した場合の処理をcatchで登録する
    // 失敗した場合、エラーを表す値が結果
    p.catch((error) => {
        console.error("失敗", error);
    });
};

const sentence8_3_2_3 = () => {
    const p = readFile("uhyo.txt", "utf-8");
    // 成功・失敗時の関数を同時に登録できる
    p.then((result) => {
        console.log("成功", result);
    },
        // 失敗時にどのようなエラーがでるかは型システム上で把握できないため、any型が使用されている（歴史的経緯）
        // 常にunknownという型注釈をつけるのがおすすめ
        (error: unknown) => {
            console.error("失敗", error);
        });
};

const sentence8_3_3 = () => {
    const p = readFile("uhyo.txt", "utf-8");
    // finallyメソッドで成功時・失敗時どちらの場合でも呼び出される関数を登録できる
    p.then((result) => {
        console.log("成功", result);
    });
    p.catch((error) => {
        console.error("失敗", error);
    });
    p.finally(() => {
        console.log("完了しました");
    });
};

// 自分でPromiseオブジェクトを作る
const sentence8_3_4 = () => {
    // new で作成可能
    // 1つの型引数と1つの引数を持つ（引数はexecutorと呼ばれる）
    // 引数名は自由に決められるが、resolveとするのが通例
    const p = new Promise<number>((resolve) => {
        setTimeout(() => {
            resolve(100);
        }, 3000);
    });

    p.then((num) => {
        console.log(`結果は${num}`);
    });

    // Promise版のseTimeoutを次のように作ることができる
    const sleep = (duration: number) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, duration);
        })
    };

    sleep(3000).then(() => {
        console.log("3秒経過");
    });
};

const sentence8_3_4_2 = () => {
    // executorには2つ目の引数があり、rejectという名前にするのが通例
    // rejectを呼び出した時にはPromiseが失敗する
    const sleepReject = (duration: number) => {
        return new Promise<never>((resolve, reject) => {
            setTimeout(reject, duration);
        })
    };

    sleepReject(3000).catch(() => {
        console.log("失敗");
    });
};

// Promiseの静的メソッド
const sentence8_3_5 = () => {
    // Promise.resolve/reject で与えられた引数を結果として即座に成功/失敗するPromiseを作成する
    const p = Promise.resolve(100);
    p.then((result) => {
        console.log(`result is ${result}`);
    });
    // 以下と同じ
    // new Promise((resolve) => { resolve(100); })
    // Promise.reject(100) は以下と同じ
    // new Promise((resolve, reject) => { reject(100); })

    // いずれの場合もthenなどで登録されたコールバック関数は非同期的に呼び出される
    const p2 = Promise.resolve();
    p2.then(() => {
        console.log("2");
    });
    console.log("1");
};

// 複数のPromiseオブジェクトを組み合わせて新しいPromiseオブジェクトを作る
const sentence8_3_6 = () => {
    // Promise.all
    // 複数のPromiseを合成するメソッド
    // Promiseオブジェクトの配列を引数として受け取り、それらが全て成功した時に成功となるPromiseオブジェクトを作って返す
    // 複数の非同期処理を並行して行いたい場合に適している
    const pFoo = readFile("foo.txt", "utf-8");
    const pBar = readFile("bar.txt", "utf-8");
    const pBaz = readFile("baz.txt", "utf-8");

    const p = Promise.all([pFoo, pBar, pBaz]);
    // [foo.txtの内容, bar.txtの内容, baz.txtの内容] という配列が渡される
    p.then((results) => {
        console.log("foo.txt: ", results[0]);
        console.log("bar.txt: ", results[1]);
        console.log("baz.txt: ", results[2]);
    });
};

const sentence8_3_6_2 = () => {
    // シンプルな書き方
    const p = Promise.all([
        readFile("foo.txt", "utf-8"),
        readFile("bar.txt", "utf-8"),
        readFile("baz.txt", "utf-8"),
    ]);
    // p.then((results) => {
    //     const [foo, bar, baz] = results;
    //     console.log("foo.txt: ", foo);
    //     console.log("bar.txt: ", bar);
    //     console.log("baz.txt: ", baz);
    // });
    // 以下のようにもできる
    p.then(([foo, bar, baz]) => {
        console.log("foo.txt: ", foo);
        console.log("bar.txt: ", bar);
        console.log("baz.txt: ", baz);
    });
};

const sentence8_3_6_3 = () => {
    // Promise.race
    // Promiseの配列を受け取り、最も早く成功もしくは、失敗したものの結果を全体の（Promise.raceが返したPromiseの）結果とする
    const p = Promise.race([
        readFile("foo.txt", "utf-8"),
        readFile("bar.txt", "utf-8"),
        readFile("baz.txt", "utf-8"),
    ]);

    // resultはどのファイルの読み込みが最初に終わったかによって変わる
    p.then((result) => {
        console.log(result);
    });

    const sleepReject = (duration: number) => {
        return new Promise<never>((resolve, reject) => {
            setTimeout(reject, duration);
        })
    };

    // readFileの処理が5秒以上かかった場合、タイムアウトとして処理を中断するように設定できる
    const p2 = Promise.race([
        readFile("foo.txt", "utf-8"),
        sleepReject(5000),
    ]);

    p2.then((result) => {
        console.log("成功", result);
    }, (error: unknown) => {
        console.log("失敗", error);
    });
};

const sentence8_3_7 = () => {
    // Promise.allSettled
    // Promiseの配列を受け取り新しいPromiseを返す
    // 渡されたすべてのPromiseが解決（成功 or 失敗）したら成功
    // Promise.allと違い、失敗したPromiseの結果も含まれる
    const sleepReject = (duration: number) => {
        return new Promise<never>((resolve, reject) => {
            setTimeout(reject, duration);
        })
    };

    const p = Promise.allSettled([
        readFile("foo.txt", "utf-8"),
        sleepReject(5000),
    ]);

    p.then((result) => {
        console.log(result);
    });
};

const sentence8_3_7_2 = () => {
    // Promise.any
    // 渡されたPromiseのうち、いずれか1つが成功したら成功となるPromiseを返す
    // 失敗した場合は、無視して他のPromiseの成功を待つ
    // つまり、成功したもののうち一番早いものが結果となる
    // すべて失敗した場合は、Promise.anyの結果も失敗となり、AggregateErrorというエラーを投げる
    const sleepReject = (duration: number) => {
        return new Promise<never>((resolve, reject) => {
            setTimeout(reject, duration);
        })
    };

    // es2021以降に設定
    const p = Promise.any([
        readFile("foo.txt", "utf-8"),
        sleepReject(5000),
    ]);

    p.then((result) => {
        console.log(result);
    });
};

// チェーンを作る
const sentence8_3_8 = () => {
    // then, catch, finallyなどは新しいPromiseオブジェクトを返す
    const p = readFile("foo.txt", "utf-8");
    const p2 = p.then((result) => result + result);
    p2.then((result) => {
        console.log(result);
    });

    const p3 = p.catch(() => "");
    // pの読み込みが失敗した場合""が出力される
    p3.then((result) => {
        console.log(result);
    });

    // Promiseチェーン
    readFile("foo.txt", "utf-8")
        .catch(() => {
            return "";
        })
        .then((result) => {
            console.log(result);
        });

    // finallyをチェーンに挟んでもPromiseの結果は変わらない
    readFile("foo.txt", "utf-8")
        .finally(() => {
            console.log("foo.txt is loaded?");
        })
        .catch(() => "")
        .then((result) => {
            console.log(result);
        });
};

// 非同期処理の連鎖
const sentence8_3_9 = () => {
    // 1秒かけて与えられた文字列を10回繰り返す関数
    // 言い換えると、1秒後に与えられた文字列を10回繰り返した文字列を結果として、成功するPromiseを返す関数
    const repeat10 = (str: string) =>
        new Promise<string>((resolve) => {
            setTimeout(() => resolve(str.repeat(10)),
                1000);
        });


    readFile("foo.txt", "utf-8")
        .then((result) => repeat10(result))
        .then((result) => {
            console.log(result);
        });

    // 上記を分解すると以下のようになる
    const p1 = readFile("foo.txt", "utf-8");
    const p3 = p1.then((result) => {
        const p2 = repeat10(result);
        return p2;
    });
    // PromiseのPromiseは作られない
    // p3はPromise p2の結果がそのままp3の結果となる
    // thenのコールバック関数がPromiseを返すことで非同期処理を順番に実行したい場合に有効
    p3.then((result) => {
        console.log(result);
    });
};

// エラーの扱い
const sentence8_3_10 = () => {
    // 失敗したPromiseはcatchで成功に変換可能
    // 逆に、成功したPromiseを失敗に変換することも可能
    const p1 = readFile("foo.txt", "utf-8");
    const p2 = p1.then((result) => {
        // Promiseでthrowを使うとエラーの発生とみなし、Promiseの失敗を引き起こす
        throw new Error("error");
    });
    // p2は失敗する
    p2.then((result) => {
        console.log(result);
    });
};

const sentence8_3_10_2 = () => {
    // thenで返したPromiseが失敗した場合も全体の結果が失敗となる
    const sleepReject = (duration: number) => {
        return new Promise<never>((resolve, reject) => {
            setTimeout(reject, duration);
        })
    }
    const p = readFile("foo.txt", "utf-8")
        .then(() => sleepReject(1000))
        .then((result) => {
            console.log(result)
        },
            // エラーのコールバック関数を登録しないと強制終了エラーが出る
            // () => {
            //     console.log("error")
            // }
        )
        // コールバック関数でエラーハンドリングするか、catchによるエラーハンドリングを追加する
        .catch((error) => {
            console.log(error)
        });
};

const sentence8_3_10_3 = () => {
    // 8.3.2でエラーの出ていたコード
    const p = readFile("hoge.txt", "utf-8");
    // ここの返り値Promiseに失敗したときのコールバック関数が登録されていないのが原因
    // p.then((result) => {
    //     console.log(result);
    // });
    // p.catch((error) => {
    //     console.log(error);
    // });
    // 以下のようにすべき
    // pが成功したらp.thenのコールバック関数が呼ばれ
    // pが失敗したらp2に伝搬して、p2のコールバック関数が呼ばれる
    const p2 = p.then((result) => {
        console.log(result);
    });
    const p3 = p2.catch((error) => {
        console.log(error);
    });
};

// dynamic import
const sentence8_3_11 = () => {
    // import("モジュール名")として非同期的にモジュールを読み込むことができる
    // import はPromiseを返す
    import("fs/promises")
        .then(({ readFile }) =>
            readFile("foo.txt", "utf-8")
        )
        .then((result) => {
            console.log(result);
        });
};

// sentence8_3_1();
// sentence8_3_2_1();
// sentence8_3_2_2();
// sentence8_3_2_3();
// sentence8_3_3();
// sentence8_3_4();
// sentence8_3_4_2();
// sentence8_3_5();
// sentence8_3_6();
// sentence8_3_6_2();
// sentence8_3_6_3();
// sentence8_3_7();
// sentence8_3_7_2();
// sentence8_3_8();
// sentence8_3_9();
// sentence8_3_10();
// sentence8_3_10_2();
// sentence8_3_10_3();
sentence8_3_11();