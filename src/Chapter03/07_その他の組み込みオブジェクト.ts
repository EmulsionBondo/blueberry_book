// Dateオブジェクト

const sentence3_7_1 = () => {
    const d = new Date();
    console.log(d);
    console.log(d.getFullYear());
    console.log(d.getMonth());

    // 年の書き換え
    d.setFullYear(2020);
    console.log(d);

    // ISO 8601形式
    const d2 = new Date("2020-02-03T15:00:00+09:00");
    console.log(d2);

    // ISO 8601形式の文字列に変換
    console.log(d.toISOString());

    // Unix時間（1970年1月1日午前0時からの経過ミリ秒）の形式
    const timeNum = d2.getTime();
    console.log(timeNum);

    const d3 = new Date(0);
    console.log(d3);

    // 現在時刻（Unix時間）を取得
    console.log(Date.now());
};

// 正規表現オブジェクト
const sentence3_7_2 = () => {
    // new RegExpとして正規表現オブジェクトを作成
    // 正規表現リテラルは "/" "/"(flag)で囲む
    // flagを付加することで、正規表現の挙動を変更できる（i, g, m, s, u, yの6種類）

    const r = /ab+c/;

    console.log(r.test("abbbc")); // true
    console.log(r.test("Hello, abc world!")); // true
    console.log(r.test("ABC")); // false
    console.log(r.test("こんにちは")); // false

    const r2 = /^abc/;
    console.log(r2.test("abcdefg")); // true
    console.log(r2.test("Hello, abcdefg")); // false
};

// 正規表現を使う方法
const sentence3_7_3 = () => {
    // replaceメソッド
    console.log("Hello, abbbbbbbc world! abbc".replace(/ab+c/, "foobar")); // 最初にマッチした部分のみ置換
    console.log("Hello, abbbbbbbc world! abbc".replace(/ab+c/g, "foobar")); // gフラグをつけると、全てのマッチした部分を置換

    // matchメソッド
    const result = "Hello, abbbbbbbc world! abc".match(/a(b+)c/);
    if (result !== null) {
        console.log(result[0]);
        console.log(result[1]);
    }
    // 名前付きキャプチャリンググループ
    // ?<name> という形式で指定する
    const result2 = "Hello, abbbbbbbc world! abc".match(/a(?<mygroup>b+)c/);
    if (result2 !== null) {
        console.log(result2.groups);
    }
    // gフラグを持っている場合、キャプチャリンググループは無視され、マッチする部分文字列が全て列挙された配列を返す
    const result3 = "Hello, abbbbbbbc world! abc".match(/a(b+)c/g);
    console.log(result3);
};

// Mapオブジェクト、Setオブジェクト
const sentence3_7_4 = () => {
    // オブジェクトではプロパティ名は原則文字列であるが、Mapオブジェクトではそれ以外の値もキーにできる（プリミティブ以外にもオブジェクトもキーにできる）
    const map: Map<string, number> = new Map();
    map.set("foo", 1234);

    console.log(map.get("foo")); // 1234
    console.log(map.get("bar")); // undefined
};

// プリミティブがプロパティを持つ？
const sentence3_7_5 = () => {
    // オブジェクト以外の値、つまりプリミティブはプロパティを持たない
    // 文字列、数値、BigIntはプロパティやメソッドを持っているかのように見える挙動がある
    console.log("Hello, world".length);
    // プリミティブに対してプロパティアクセスを行うと、一時的にオブジェクトが生成され、そのオブジェクトのプロパティにアクセスする
    // lengthやmatchメソッドなどはこの一時的なオブジェクトが持つプロパティやメソッドである

    // 文字列型はlengthプロパティを持っているから以下のように文字列を代入できる
    type HasLength = { length: number };
    const obj: HasLength = "foobar";

    // {}型の扱い
    // なにかプロパティがあるオブジェクトでも {}型の値として認められる（構造的部分型）
    // {} 型は値になんの制限もかけていない型であると言い換えられる
    // 実際に {}型は nullとundefined以外のあらゆる値を受け入れる
    // 以下はok
    let val: {} = 123;
    val = "abc";
    val = { num: 1234 };
    // 以下はエラー
    // val = null;
    // val = undefined;
};

sentence3_7_1();
sentence3_7_2();
sentence3_7_3();
sentence3_7_4();
sentence3_7_5();