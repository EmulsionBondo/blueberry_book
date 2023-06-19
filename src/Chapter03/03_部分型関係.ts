// 部分型とは
// 2つの方の互換性を表す
// 型Sが型Tの部分型であるとは、S型の値がT型の値でもあることを指す
const sentence3_3_1 = () => {
    type FooBar = {
        foo: string;
        bar: number;
    };

    type FooBarBaz = {
        foo: string;
        bar: number;
        baz: boolean;
    };

    const obj: FooBarBaz = {
        foo: "hi",
        bar: 1,
        baz: false
    };
    const obj2: FooBar = obj; // FooBarBaz型の値はFooBar型の値でもある
};

// プロパティの包含関係による部分型関係の発生
// オブジェクト型の場合、プロパティ位の包含関係によって部分型関係を説明できる
// 以下の2つの条件が満たされれば型Sが型Tの部分型である
// 1. Tが持つプロパティはすべてSにも存在
// 2. 条件1. の各プロパティについて、Sにおけるそのプロパティの型はTにおけるプロパティの型の部分型（または同じ型）
const sentence3_3_2 = () => {
    // 1. Animal型のageはHuman型にも存在
    // 2. Animal型のageはHuman型のageと同じnumber型
    // Human型はAnimal型の部分型
    type Animal = {
        age: number;
    };
    type Human = {
        age: number;
        name: string;
    };

    // 1. AnimalFamilyに存在するプロパティはすべてHumanFamilyにも存在
    // 2. familyNameは同じstring型、motherはHuman型で、AnimalFamilyのmotherはAnimal型、つまりHuman型の部分型（fatherもchildも同様）
    type AnimalFamily = {
        familyName: string;
        mother: Animal;
        father: Animal;
        child: Animal;
    };
    type HumanFamily = {
        familyName: string;
        mother: Human;
        father: Human;
        child: Human;
    };
};

// 余剰プロパティに対する型エラー
// オブジェクトリテラルに余計なプロパティが存在する、というエラーが発生することがある
const sentence3_3_3 = () => {
    type User = { name: string; age: number };
    // 部分型関係からは問題ないはずだが、ミス防止のためにエラーを出す（オブジェクトリテラルを直に代入する場合にのみ発生）
    const u: User = {
        name: "uhyo",
        age: 26,
        // telNumber: "09012345678"; // エラー
    }
    // 以下のようにするとエラーは発生しない
    const u2 = {
        name: "uhyo",
        age: 26,
        telNumber: "09012345678",
    };
    // 部分型関係から問題ない
    const u3: User = u2;
};


sentence3_3_1();
sentence3_3_2();
sentence3_3_3();