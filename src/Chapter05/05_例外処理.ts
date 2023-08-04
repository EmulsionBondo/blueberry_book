// throw文・Errorオブジェクト
const sentence5_5_1_1 = () => {
    console.log("エラーを発生させます");
    throwError();
    console.log("エラーを発生させました");

    function throwError() {
        // エラーを表すオブジェクトを作成
        const error = new Error("エラーが発生しました");
        // throw文でエラーを投げる
        throw error;
    };

    // function getAverage(nums: number[]) {
    //     if (nums.length === 0) {
    //         throw new Error("配列が空です");
    //     }
    //     return sum(nums) / nums.length;
    // }
};

// try-catch文
const sentence5_5_2_1 = () => {
    try {
        console.log("エラーを発生させます");
        throwError();
        console.log("エラーを発生させました");
    } catch (err) {
        console.log(err);
    }
    console.log("おわり");

    function throwError() {
        const error = new Error("エラーが発生しました");
        throw error;
    }
};

const sentence5_5_3_1 = () => {
    try {
        throwError();
    } catch (err) {
        // 何もしない
    }
    function throwError() {
        const error = new Error("エラーが発生しました");
        throw error;
    }

    // undefinedを失敗した値として返す方法もある
    function getAverage(nums: number[]) {
        if (nums.length === 0) {
            return undefined;
        }
        let sum = 0;
        for (const num of nums) {
            sum += num;
        }
        return sum / nums.length;
    }
};

// finally
const sentence5_5_4_1 = () => {
    try {
        throwError();
    } catch (err) {
        console.log("catch");
    } finally {
        console.log("finally");
    }
    function throwError() {
        const error = new Error("エラーが発生しました");
        throw error;
    }
};

const sentence5_5_4_2 = () => {
    // finallyはerrorが発生しなくても実行される
    try {
        console.log("try");
    } finally {
        console.log("finally");
    }

    // 関数の中でreturn文が実行された場合、finallyはその後に実行される
    function sum(max: number): number {
        try {
            let result = 0;
            for (let i = 0; i <= max; i++) {
                result += i;
            }
            return result;
        } finally {
            console.log("sumから脱出");
        }
    }

    sum(100);
};

// sentence5_5_1_1();
sentence5_5_2_1();
sentence5_5_3_1();
sentence5_5_4_1();
sentence5_5_4_2();