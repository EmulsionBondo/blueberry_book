// 返り値の型による部分型関係
// SがTの部分型ならば、同じ引数リストに対して
// (引数リスト) => S は (引数リスト) => T の部分型
const sentence4_3_1 = () => {
    // HasNameAgeはHasNameの部分型
    type HasName = {
        name: string;
    };
    type HasNameAndAge = {
        name: string;
        age: number;
    };

    // (age: number) => HasNameAndAge が (age: number) => HasName の部分型
    const fromAge = (age: number): HasNameAndAge => ({
        name: "John Smith",
        age,
    });
    const f: (age: number) => HasName = fromAge;
    const obj: HasName = f(100);
    // HasName型だが、ageプロパティがある
    // 型情報に合わせて情報が削られることはない（型情報がランタイムの挙動に影響を与えないという原則から）
    console.log(obj);

    // どんな型を返す関数型も（同じ引数を受け取って）void型を返す関数型の部分型として扱われる
    const f2 = (name: string) => ({ name });
    const g: (name: string) => void = f2;
    console.log(g("John Smith"));
};

// 引数の型による部分型関係
// 型Sが型Tの部分型ならば、「Tを引数に受け取る関数」の型は「Sを引数に受け取る型関数」の型の部分型となる
// S型の引数はT型の引数とみなせるので、T型の引数のところにS型の値を受け取ってもT型として扱える
// つまり、「Tを引数に受け取る関数」は「Sを引数に受け取る関数」として扱える

// 関数型の返り値の型は関数型の「共変」の位置にあると言い
// 関数型の引数の型は関数型の「反変」の位置にあると言う
// 共変は順方向、反変は逆方向の意味
// Fを(obj: HasName, num: number) => HasNAmeAndAge型、Gを(obj: HasNameAndAge, num: number) => HasName型とする
// 「SがTの部分型であること」をS <: Tと表すと
// HasName :> HasName という関係が成り立つ
// 返り値の型は、HasNameAndAge <: HasName という関係が成り立つ
// 以上のことから、F <: G という関係が成り立つということが言える
const sentence4_3_2 = () => {
    // HasNameAndAge は HasName の部分型
    type HasName = {
        name: string;
    };
    type HasNameAndAge = {
        name: string;
        age: number;
    };

    // 「HasName を引数に受け取る関数」の型は「HasNameAndAgeを引数に受け取る関数」の型の部分型
    const showName = (obj: HasName) => {
        console.log(obj.name);
    };
    const g: (obj: HasNameAndAge) => void = showName;
    g({ name: "uhyo", age: 26 });
};

// 引数の数による部分型関係
// ある関数型Fの引数リストの末尾に新たな引数を追加して関数型Gを作った場合 F <: G となる
const sentence4_3_3 = () => {
    type UnaryFunc = (arg: number) => number;
    type BinaryFunc = (left: number, right: number) => number;
    const double: UnaryFunc = (n) => n * 2;
    const add: BinaryFunc = (a, b) => a + b;

    // UnaryFuncをBinaryFuncとして扱うことができる
    const bin: BinaryFunc = double;
    // 10がargに入り100は捨てられる
    // 余計な引数を無視することで、関数が本来受け取る引数よりも多くの引数を渡すことが可能
    // 引数の少ない関数型はより引数の多い関数型の部分型となる
    // 関数型F、Gについて、「Fの引数の数はGの数以下」「両方に存在する引数については反変の条件を満たす」「返り値については共変の条件を満たす」
    // 上記をすべて満たすと、F <: G となる
    console.log(bin(10, 100));
};


sentence4_3_1();
sentence4_3_2();