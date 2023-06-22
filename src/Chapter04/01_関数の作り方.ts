// 関数宣言で関数を作る
// function 関数名（引数リスト）: 戻り値の型 { 中身 }

function range(min: number, max: number): number[] {
    const result: number[] = [];
    for (let i = min; i <= max; i++) {
        result.push(i);
    }
    return result;
};

const sentence4_1_1 = () => {
    console.log(range(5, 10));
};

// 返り値がない関数を作る
function helloWorldNTimes(n: number): void {
    for (let i = 0; i < n; i++) {
        console.log("Hello, world!");
    }
};

const sentence4_1_2 = () => {
    helloWorldNTimes(5);
};

// 関数式で関数を作る
// function (引数リスト): 返り値の型 { 中身 }
// function の後に関数名がなく、式の評価結果が関数式によって作られた関数そのものになる
// 関数も値の一種であり、プリミティブではないのでオブジェクトである
const sentence4_1_3 = () => {
    type Human = {
        height: number;
        weight: number;
    };
    const calcBMI = function (human: Human): number {
        return human.weight / (human.height * human.height);
    };
    const uhyo: Human = { height: 1.84, weight: 72 };
    console.log(calcBMI(uhyo));

    // 引数に対して分割代入を行うことも可能
    const calcBMI2 = function ({ height, weight }: Human): number {
        return weight / (height * height);
    };
    console.log(calcBMI2(uhyo));
};

// アロー関数式で関数を作る
// 式の一種であり、評価されると関数を作って返す
// (引数リスト): 返り値の型 => { 中身 }
const sentence4_1_4 = () => {
    type Human = {
        height: number;
        weight: number;
    };
    const calcBMI = ({ height, weight }: Human): number => {
        return weight / (height * height);
    };
    const uhyo: Human = { height: 1.84, weight: 72 };
    console.log(calcBMI(uhyo));
};

// アロー関数式の省略形
// (引数リスト): 返り値の型 => 式
// 通常の書き方　（引数リスト）: 返り値の型 => { return 式 }
const sentence4_1_5 = () => {
    type Human = {
        height: number;
        weight: number;
    };
    const calcBMI = ({ height, weight }: Human) => weight / (height * height);
    console.log(calcBMI({ height: 1.84, weight: 72 }));

    // 返り値の式としてオブジェクトリテラルを返す場合は()で囲む必要がある
    type RetunObj = {
        bmi: number;
    };
    // 正しい書き方
    const calcBMIObject = ({ height, weight }: Human): RetunObj => ({ bmi: weight / (height * height) });
    // コンパイルエラー
    // const calcBMIObject2 = ({ height, weight }: Human): RetunObj => { bmi: weight / (height * height) };
};

// メソッド記法で関数を作る
// オブジェクトリテラルの中で使用することができる、プロパティを定義する記法の一種
// プロパティ名（引数リスト）: 返り値の型 { 中身 }
const sentence4_1_6 = () => {
    const obj = {
        // メソッド記法
        double(num: number): number {
            return num * 2;
        },
        // 通常の気泡 + アロー関数式
        double2: (num: number) => num * 2,
    }
    console.log(obj.double(100));
    console.log(obj.double2(-50));
};

// 可変長引数の宣言
// TypeScriptではrest引数構文で実現できる
const sentence4_1_7 = () => {
    const sum = (...args: number[]): number => {
        let result = 0;
        for (const num of args) {
            result += num;
        }
        return result;
    };
    console.log(sum(1, 10, 100));
    console.log(sum(123, 456));
    console.log(sum());
};

// 通常の引数と併用可能
const sentence4_1_7_2 = () => {
    const sum = (base: number, ...args: number[]): number => {
        let result = base * 1000;
        for (const num of args) {
            result += num;
        }
        return result;
    };
    console.log(sum(1, 10, 100));
    console.log(sum(123, 456));
};

// 関数呼び出しにおけるスプレッド構文
// 引数リストには、式の代わりに ...式　という形の構文が使用可能
const sentence4_1_8 = () => {
    const sum = (...args: number[]): number => {
        let result = 0;
        for (const num of args) {
            result += num;
        }
        return result;
    };
    const nums = [1, 2, 3, 4, 5];
    // sum(1, 2, 3, 4, 5) と一緒
    console.log(sum(...nums));

    const sum3 = (a: number, b: number, c: number): number => a + b + c;
    // 型チェックではnumsは要素数不定のnumber[]型であるためエラーになる
    // const num3 = [1, 2, 3];
    // console.log(sum3(...num3));

    // 要素数が3つのタプル型などにすればエラーにならない
    const nums3: [number, number, number] = [1, 2, 3];
    console.log(sum3(...nums3));
};

// オプショナル引数の宣言
// 引数名?: 型
const sentence4_1_9 = () => {
    const toLowerOrUpper = (str: string, upper?: boolean): string => {
        // upperが省略された場合 undefinedが代入される（boolean型の場合はfalseに変換される）
        if (upper) {
            return str.toUpperCase();
        }
        else {
            return str.toLowerCase();
        }
    };
    console.log(toLowerOrUpper("Hello"));
    console.log(toLowerOrUpper("Hello", false));
    console.log(toLowerOrUpper("Hello", true));
};

// デフォルト値を指定する場合
// 変数名: 型 = 式
const sentence4_1_9_2 = () => {
    const toLowerOrUpper = (str: string, upper: boolean = false): string => {
        // upperが省略された場合 undefinedが代入される（boolean型の場合はfalseに変換される）
        if (upper) {
            return str.toUpperCase();
        }
        else {
            return str.toLowerCase();
        }
    };
    console.log(toLowerOrUpper("Hello"));
    console.log(toLowerOrUpper("Hello", false));
    console.log(toLowerOrUpper("Hello", true));
};

// コールバック関数
// 関数の引数として関数を渡すこと
// 配列のmap関数が代表的な例
const sentence4_1_10 = () => {
    type User = { name: string, age: number };
    const getName = (u: User): string => u.name;
    const users: User[] = [
        { name: "uhyo", age: 26 },
        { name: "John Smith", age: 15 },
    ];
    const names = users.map(getName);
    console.log(names);

    // 以下のように書くことも可能
    const names2 = users.map((u: User): string => u.name);
    console.log(names2);

    // filter、every、some、findメソッドなどもよく使われる
    const adultUsers = users.filter((u: User): boolean => u.age >= 20);
    // すべてのユーザーが20歳以上ならtrue
    const allAdult = users.every((u: User): boolean => u.age >= 20);
    // 60歳以上のユーザーが1人でもいればtrue
    const seniorExists = users.some((u: User): boolean => u.age >= 60);
    // 名前がJohnで始まるユーザーを探して返す
    const john = users.find((u: User): boolean => u.name.startsWith("John"));
};

sentence4_1_1();
sentence4_1_2();
sentence4_1_3();
sentence4_1_4();
sentence4_1_5();
sentence4_1_6();
sentence4_1_7();
sentence4_1_7_2();
sentence4_1_8();
sentence4_1_9();
sentence4_1_9_2();
sentence4_1_10();
