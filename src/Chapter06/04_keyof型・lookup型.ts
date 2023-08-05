// lookup型
// T[K] という構文を持つ型
const sentence6_4_1_1 = () => {
    type Human = {
        type: "human";
        name: string;
        age: number;
    };

    // age: number とも書ける
    // ageプロパティをBigInt型にしたい場合、Human["age"]と書いた場合は変更しなくてもよくなる
    // ただし、具体的な型がわからないというデメリットもあるので使いすぎはよくない
    function setAge(human: Human, age: Human["age"]): Human {
        return { ...human, age };
    }

    const uhyo: Human = {
        type: "human",
        name: "uhyo",
        age: 26,
    };
    const uhyo2 = setAge(uhyo, 27);
    console.log(uhyo2);
};

// keyof型
// オブジェクト型からオブジェクトのプロパティ名の型を得る機能
// keyof T
const sentence6_4_2_1 = () => {
    type Human = {
        name: string;
        age: number;
    };

    // "name" | "age"
    type HumanKeys = keyof Human;
    let key: HumanKeys = "name";
    key = "age";
    // "hoge"はプロパティにないためエラー
    // key = "hoge";

    const mmConversionTable = {
        mm: 1,
        m: 1e3,
        km: 1e6,
    };

    // typeof mmConversionTable の型は {mm: number, m: number, km: number}型
    // keyof typeof mmConversionTable の型は "mm" | "m" | "km"型
    // keyof typeof 変数という形でプロパティ名を文字列で引数に渡すパターンがよく使われる
    function convertUnits(value: number, unit: keyof typeof mmConversionTable) {
        const mmValue = value * mmConversionTable[unit];
        return {
            mm: mmValue,
            m: mmValue / 1e3,
            km: mmValue / 1e6,
        }
    }
    console.log(convertUnits(5600, "m"));
};

// keyof型・lookup型とジェネリクス
const sentence6_4_3_1 = () => {
    // K は keyof T の部分型
    function get<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    type Human = {
        name: string;
        age: number;
    };

    const uhyo: Human = {
        name: "uhyo",
        age: 26,
    }
    const uhyoName = get(uhyo, "name");
    const uhyoAge = get(uhyo, "age");
};

// number型もキーになれる？
// キー名は文字列のリテラル型であるが、キー名はnumber型や数値のユニオン型になることもある
// 数値をキーとするプロパティをオブジェクト型で定義した場合に発生する
const sentence6_4_4_1 = () => {

    type Obj = {
        0: string;
        1: number;
    }

    const obj: Obj = {
        0: "uhyo",
        "1": 26,
    };

    obj["0"] = "jhon";
    obj[1] = 35;

    // 0 | 1 型
    type ObjKeys = keyof Obj;
};

sentence6_4_1_1();
sentence6_4_2_1();
sentence6_4_3_1();