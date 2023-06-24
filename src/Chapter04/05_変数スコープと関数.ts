// 変数のスコープとは

const sentence4_5_1 = () => {
    // resultは repeat関数のスコープに属する
    const repeat = function <T>(element: T, length: number): T[] {
        const result: T[] = [];
        for (let i = 0; i < length; i++) {
            result.push(element);
        }
        // スコープ内では同じ変数名は複数回宣言できない
        // const result: T[] = [];
        return result;
    }
    // resultは関数の外で参照できない
    // console.log(result);
};

const sentence4_5_1_2 = () => {
    const repeatLength = 5;
    const repeat = function <T>(element: T): T[] {
        const result: T[] = [];
        // 外側の変数 repeatLength を参照できる
        for (let i = 0; i < repeatLength; i++) {
            result.push(element);
        }
        return result;
    }
    console.log(repeat("a"));

    const repeat2 = function <T>(element: T): T[] {
        // 内側で外側と同じ変数名を使っても良い
        // その場合内側の変数が優先される
        const repeatLength = 3;
        const result: T[] = [];
        for (let i = 0; i < repeatLength; i++) {
            result.push(element);
        }
        return result;
    }
    console.log(repeat2("a"));
    console.log(repeatLength);
};

// ブロックスコープと関数スコープ
// ブロックの範囲に対して発生するのがブロックスコープ
const sentence4_5_2 = () => {
    function sabayomi(age: number) {
        // ブロックを分けることで同じ変数名を複数回使うこともできる
        if (age >= 30) {
            const lie = age - 10;
            return lie;
        }
        if (age >= 20) {
            const lie = age - 5;
            return lie;
        }
        // lie はif文のブロックスコープに属するためその外では参照できない
        // console.log(lie);
        return age;
    }

    for (let i = 0; i < 10; i++) {
        // i はfor文のブロックスコープに属する
        console.log(i);
    }
    // for文の外では参照できない
    // console.log(i);
};

sentence4_5_1();
sentence4_5_1_2();
sentence4_5_2();