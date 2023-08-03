// 関数の中のthis
// メソッドの場合、uhyo.isAdult()のように呼び出す
// 呼び出されたメソッドの中でthisが何かはこの時に決まる（.の左のオブジェクトがthisになる）
const sentence5_4_1_1 = () => {
    class User {
        name: string;
        #age: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.#age = age;
        }

        public isAdult(): boolean {
            return this.#age >= 20;
        }
    }
    const uhyo = new User("uhyo", 26);
    const john = new User("John", 15);
    // 同じクラスの複数のインスタンスは、それらが持つメソッドは同じ関数オブジェクト
    console.log(uhyo.isAdult == john.isAdult);

    const isAdult = uhyo.isAdult;
    // thisを使う関数をメソッド呼び出しの記法以外で呼び出すとランタイムエラーになる
    // (this は undefined になる)
    // console.log(isAdult());
};

// アロー関数はthisに関して特殊な性質を持つ
// アロー関数はthisを外側の関数から受け継ぐ（自分自身のthisを持たない）
const sentence5_4_2_1 = () => {
    class User {
        name: string;
        #age: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.#age = age;
        }
        public isAdult(): boolean {
            return this.#age >= 20;
        }
        public filterOlder(users: readonly User[]): User[] {
            // u => u.#age > this.#age の外側の関数はfilterOlder
            return users.filter(u => u.#age > this.#age);
        }
        // アロー関数を使わずに書くとthisの型が不明であるというエラーが出る
        // public filterOlder(users: readonly User[]): User[] {
        //     return users.filter(function (u) {
        //         return u.#age > this.#age;
        //     });
        // 関数内でthisが何であるかを明示したい場合は引数リストの先頭にthisを書いて型注釈をする
        // ただし実際に呼び出すとランタイムエラーになる
        public filterOlder2(users: readonly User[]): User[] {
            return users.filter(function (this: User, u) {
                return u.#age > this.#age;
            });
        }
    }

    const uhyo = new User("uhyo", 26);
    const john = new User("John", 15);
    const bob = new User("Bob", 30);

    // uyho.filterOlderのthisはuyho
    const older = uhyo.filterOlder([john, bob]);
    console.log(older); // [User { name: 'Bob', #age: 30 }]
};

// thisを操作するメソッド
// thisの呼び方は 関数名() 、obj.関数名() の2種類（前者はundefined、後者はobj）
// それ以外の特殊な方法（メタプログラミング気味であまり使わない）
const sentence5_4_3_1 = () => {
    class User {
        name: string;
        #age: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.#age = age;
        }
        public isAdult(): boolean {
            return this.#age >= 20;
        }
    }

    const uhyo = new User("uhyo", 26);
    const john = new User("John", 15);

    console.log(uhyo.isAdult()); // true
    // applyメソッドを使うとthisを指定できる
    // func.apply(obj, [arg1, arg2, ...]])
    // uhyo.isAdultをjohnをthisとして呼び出す
    console.log(uhyo.isAdult.apply(john)); // false

    // callメソッドも同様で、記法が異なる
    // func.call(obj, arg1, arg2, ...])
    console.log(uhyo.isAdult.call(john)); // false

    // bindを使うと、元の関数と同じ処理をするが、thisが固定されている新しい関数オブジェクトを作る
    // thisをuhyoに固定された関数オブジェクトが作られる
    const boundIsAdult = uhyo.isAdult.bind(uhyo);

    console.log(boundIsAdult()); // true
    console.log(boundIsAdult.call(john)); // true
};

// 関数の中以外のthis
// プログラムの一番外側（他の関数の中ではない場所）ではthisはundefined
const sentence5_4_4_1 = () => {
    class A {
        foo = 123;
        // コンストラクタ内のthisと同じnew時に作られるインスタンスを指す
        bar = this.foo + 100;
        // プロパティの初期化子とメソッドの中のthisは同じ
        getFoo() {
            return this.foo;
        }
    }

    const obj = new A();
    console.log(obj.bar); // 223
    console.log(obj.getFoo()); // 123

    // 静的プロパティ、静的初期化ブロックの中のthisはクラスオブジェクトそのものを指す
    class B {
        static foo = 123;
        static bar = this.foo * 2;
        static {
            console.log(this.bar); // 246
        }
    }
    const obj2 = new B();
};

sentence5_4_1_1();
sentence5_4_2_1();
sentence5_4_3_1();
sentence5_4_4_1();