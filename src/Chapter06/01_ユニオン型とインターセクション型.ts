// ユニオン型
// T型 または U型 のような表現
const sentence6_1_1_1 = () => {
    type Animal = {
        species: string;
    }
    type Human = {
        name: string;
    }

    type User = Animal | Human;
    const tama: User = {
        species: "cat"
    };
    const uhyo: User = {
        name: "uhyo"
    };

    // Animal or Humanではない型はエラー
    // const book: User = {
    //     title: "Software Design"
    // };

    // Humanにのみ存在するnameをUser型のプロパティで取得しようとするのはエラー
    // function getName(user: User): string {
    //     return user.name;
    // }

};

const sentence6_1_2_1 = () => {
    type Animal = {
        species: string;
        age: string;
    }
    type Human = {
        name: string;
        age: number;
    }

    type User = Animal | Human;
    const tama: User = {
        species: "cat",
        age: "17"
    }
    const uhyo: User = {
        name: "uhyo",
        age: 30
    }

    function showAge(user: User) {
        // age は string | number
        const age = user.age;
        console.log(age);
    }

    type MysteryFunc =
        | ((str: string) => string)
        | ((str: string) => number);

    function useFunc(func: MysteryFunc) {
        const result = func("uhyo");
        console.log(result);
    }

    // 関数と関数でないユニオン型も作れる
    type MaybeFunc =
        | ((str: string) => string)
        | string;
    // しかし、関数呼び出ししようとするとエラー
    // function useFunc2(func: MaybeFunc) {
    //     const result = func("uhyo");
    // }
};

// インターセクション型
// T & U : T 型 かつ U 型
// オブジェクト型を拡張した新しい方を作る用途で使われる
const sentence6_1_3_1 = () => {
    type Animal = {
        species: string;
        age: number;
    }

    // Animal型かつ name: string を持つ型
    type Human = Animal & {
        name: string;
    }
    // 以下のように宣言するのとほぼ同様
    // type Human = {
    //     species: string;
    //     age: number;
    //     name: string;
    // }
    const tama: Animal = {
        species: "cat",
        age: 3,
    };
    const uhyo: Human = {
        species: "human",
        name: "uhyo",
        age: 26,
    };

    // プリミティブ型同士のインターセクション型はnever型になる
    // never型の値を作るのは不可能
    type A = string & number;
};

const sentence6_1_4_1 = () => {
    type Human = { name: string };
    type Animal = { species: string };
    function getName(human: Human) {
        return human.name;
    }
    function getSpecies(animal: Animal) {
        return animal.species;
    }

    // Humanを受け取る場合と、Animalを受け取る可能性があるためユニオン型になる
    const myFunc = Math.random() < 0.5 ? getName : getSpecies;
    // const cat = {
    //     species: "cat",
    // }
    // const uhyo = {
    //     name: "uhyo",
    // }
    // myFuncはHumanを受け取るとは限らず、Animalを受け取るとも限らないので
    // HumanもAnimalも渡すことができない
    // myFunc(uhyo);
    // myFunc(cat); 

    // Human & Animal型を渡せばよい
    const uhyo: Human & Animal = {
        name: "uhyo",
        species: "human",
    };
    console.log(myFunc(uhyo));
};

const sentence6_1_5_1 = () => {
    // ageは number | undefined
    // オプショナルプロパティは必然的にユニオン型
    type Human = {
        name: string;
        age?: number;
        // age: number | undefined; と同じ意味で扱われるが厳密には異なる
        // age? は「ageがない」ことを許すが、age: number | undefined は「ageがない」ことは許されない
    }

    const uhyo: Human = {
        name: "uhyo",
        age: 30,
    };

    const john: Human = {
        name: "john",
        // 明示的にundefinedを渡すこともできる
        age: undefined,
    };

    type Human2 = {
        name: string;
        age: number | undefined;
    }
    // ageがないのでエラー
    // const uhyo2: Human2 = {
    //     name: "uhyo",
    // };
};

// オプショナルチェイニング
// obj.prop の代わりに obj?.prop と書く
// アクセスされるオブジェクトがnull や undefined でも使用できる
const sentence6_1_6_1 = () => {
    type Human = {
        name: string;
        age: number;
    }

    function useMaybeHuman(human: Human | undefined) {
        // Humanだったらプロパティにアクセスし、undefinedだったらアクセスしないという用途に頻出
        const age = human?.age;
        console.log(age);
    }

    // 関数呼び出しのオプショナルチェイニング
    type GetTimeFunc = () => Date;

    function useTime(getTimeFunc: GetTimeFunc | undefined) {
        // getTimeFuncがundefined以外の場合に関数呼び出しを行うことができる
        const timeOrUndefined = getTimeFunc?.();
    }

    // メソッドのオプショナルチェイニング
    type User = {
        isAdult(): boolean;
    }

    function checkForAdultUser(user: User | null) {
        // isAdult関数があり、その関数の戻り値がtrueの場合のみ処理を行う
        if (user?.isAdult()) {
            console.log("adult");
        }
    }

    function useTime2(getTimeFunc: GetTimeFunc | undefined) {
        // timeOrUndefinedはstring型 | undefined
        // ?. はそれ以降のプロパティアクセス・関数呼び出し・メソッド呼び出しをまとめて飛ばす効果がある
        // getTimeFuncがundefinedの場合 ?.().toString() は飛ばされる
        const timeOrUndefined = getTimeFunc?.().toString();
    }
};


sentence6_1_1_1();
sentence6_1_2_1();
sentence6_1_3_1();
sentence6_1_4_1();
sentence6_1_5_1();
sentence6_1_6_1();