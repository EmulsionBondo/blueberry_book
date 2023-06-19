// 型引数: 型を定義するときにパラメータをもたせることができるというもの
// ジェネリクスに少し似ている

// 型引数はtype文（interface宣言）で型を作成するときに宣言
// 型引数を宣言すると、その引数はその宣言野中でだけ有効な型名として扱われる
// 型引数を持つ方はジェネリック型とも呼ばれる
const sentence3_4_1 = () => {
    // User<T>型はstring型のnameとT型のchildを持つ
    type User<T> = {
        name: string;
        child: T;
    }
    // 複数あっても良い
    type Family<Parent, Child> = {
        mother: Parent;
        father: Parent;
        child: Child;
    }
};

// 型引数を持つ方を使用する
const sentence3_4_2 = () => {
    type Family<Parent, Child> = {
        mother: Parent;
        father: Parent;
        child: Child;
    }
    // 型引数を持つ方は型を作るためのもの（型関数）とも呼ばれる
    const obj: Family<number, string> = {
        mother: 0,
        father: 100,
        child: "1000",
    };
};

// 部分型関係による型引数の成約
// type文において型引数を宣言するとき、extendsという構文を使うことができる
// extends 型名 とすることで「この型引数は常に型名の部分型でなければならない」という制約をつけることができる
const sentence3_4_3 = () => {
    type HasName = { name: string };
    // S extends T は「SはTの部分型である」という意味
    type Family<Parent extends HasName, Child extends HasName> = {
        mother: Parent;
        father: Parent;
        child: Child;
    };
    // 以下は制約を満たしていないためエラー（number型・string型はHasName型の部分型ではない）
    // type T = Family<number, string>;

    // HumanやAnimalはHasNameの部分型
    type Animal = {
        name: string;
    };
    type Human = {
        age: number;
        name: string;
    };
    type T = Family<Animal, Human>;

    // extendsの右側には他の方引数を使うこともできる
    type Family2<Parent extends HasName, Child extends Parent> = {
        mother: Parent;
        father: Parent;
        child: Child;
    };
    // OK
    type S = Family2<Animal, Human>;
    // Animal は Humanの部分型ではないためエラー
    // type T = Family2<Human, Animal>;
};

// オプショナルな型引数
// 型引数の後ろに = 型名 を付与することで、型引数を省略可能にすることができる
// 型引数を省略したときのデフォルトが 型名 となる
const sentence3_4_4 = () => {
    type Animal = {
        name: string;
    };
    type Family<Parent = Animal, Child = Parent> = {
        mother: Parent;
        father: Parent;
        child: Child;
    };
    // 通常
    type S = Family<string, string>;
    // T は Family<Animal, Animal> と同じ
    type T = Family;
    // U は Family<string, Animal> と同じ
    type U = Family<string>;

    // オプショナルでない型引数とオプショナルな型引数を混ぜることも可能
    // オプショナルな型引数の後にオプショナルでない型引数を置くことはできない（後ろにまとめる）
    type Family2<Parent, Child = Animal> = {
        mother: Parent;
        father: Parent;
        child: Child;
    };
    // extendsと同時に使うことも可能
    type HasName = { name: string };
    type Family3<Parent extends HasName, Child = Parent> = {
        mother: Parent;
        father: Parent;
        child: Child;
    };
};

sentence3_4_1();
sentence3_4_2();
sentence3_4_3();
sentence3_4_4();