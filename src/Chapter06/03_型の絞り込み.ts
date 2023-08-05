// 等価演算子を用いる絞り込み
const sentence6_3_1_1 = () => {
    type SignType = "plus" | "minus";
    function signNumber(type: SignType) {
        return type === "plus" ? 1 : -1;
    }

    function numberWithSign(num: number, type: SignType | "none") {
        if (type === "none") {
            // typeは"none"型
            return 0;
        } else {
            // typeはSignType型
            return num * signNumber(type);
        }
    }

    console.log(numberWithSign(5, "plus"));
    console.log(numberWithSign(5, "minus"));
    console.log(numberWithSign(5, "none"));
};

// typeof演算子を用いる絞り込み
const sentence6_3_2_1 = () => {
    // typeofの挙動の例
    console.log(typeof "uhyo");
    console.log(typeof 26);
    console.log(typeof {});
    console.log(typeof undefined);

    // tyoeof を使って型の絞り込みを行う
    function formatNumberOrString(value: string | number) {
        if (typeof value === "number") {
            return value.toFixed(3);
        } else {
            return value;
        }
    }

    console.log(formatNumberOrString(3.14));
    console.log(formatNumberOrString("uhyo"));
};

// 代数的データ型をユニオン型で再現するテクニック
// タグ付きユニオン・直和型
// TypeScriptには代数的データ型はないが、オブジェクト型に"タグ"をつけることで疑似的に再現できる
const sentence6_3_3_1 = () => {
    type Animal = {
        tag: "animal";
        species: string;
    }
    type Human = {
        tag: "human";
        name: string;
    }
    type User = Animal | Human;

    const tama: User = {
        tag: "animal",
        species: "cat",
    };
    const uhyo: User = {
        tag: "human",
        name: "uhyo",
    };

    // tagプロパティが"animal"でも"human"でもないためエラー
    // const alien: User = {
    //     tag: "alien",
    //     name: "uhyo",
    // }

    function getUserName(user: User) {
        if (user.tag === "human") {
            return user.name;
        } else {
            return "名無し";
        }
    }

    console.log(getUserName(tama));
    console.log(getUserName(uhyo));
};

// switch文での絞り込み
const sentence6_3_4_1 = () => {
    type Animal = {
        tag: "animal";
        species: string;
    };
    type Human = {
        tag: "human";
        name: string;
    };

    type Robot = {
        tag: "robot";
        name: string;
    }

    type User = Animal | Human | Robot;

    // 後からRobot型を追加した場合、switch文だとエラーが出て望ましい
    // if文だとelse でRobot型を受け取ってしまうので明示的なエラーが出ない
    function getUserName(user: User): string {
        switch (user.tag) {
            case "human":
                return user.name;
            case "animal":
                return "名無し";
            case "robot":
                return user.name;
        }
    }
};

sentence6_3_1_1();
sentence6_3_2_1();
sentence6_3_3_1();
