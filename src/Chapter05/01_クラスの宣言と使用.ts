// クラス宣言とnew構文
const sentence5_1_1 = () => {
    // クラス宣言（関す宣言と同様に「クラスが入った変数」を作成する構文）
    // class クラス名 {...}
    class User {
        name: string = "";
        age: number = 0;
    }
    // new演算子でインスタンスを作成
    // 正確には new 式（引数リスト）という構文
    // そのためUserという変数に入っているクラスのインスタンスを作成する、という意味になる
    const uhyo = new User();
    console.log(uhyo.name);
    console.log(uhyo.age);

    uhyo.age = 26;
    console.log(uhyo.age);

    // クラスを別の変数に入れたり、オブジェクトのプロパティにすることができる

    // User クラスが入ったオブジェクト 
    const obj = {
        cl: User
    };
    const uhyo2 = new obj.cl();
    console.log(uhyo2.name);
};

// プロパティを宣言する
const sentence5_1_2 = () => {
    // プロパティ宣言の基本の形は プロパティ名: 型 = 式;
    // 式は初期値
    class User {
        name: string = "";
        age: number = 0;
        // プロパティ宣言は初期値を省略可能だが、コンストラクタが必要なので以下はエラー
        // age: number;
    }
    const uhyo = new User();
    console.log(uhyo.name);
    console.log(uhyo.age);

    // オプショナル/readonlyも使用可能
    class User2 {
        name?: string = "";
        readonly age: number = 0;
        // プロパティ宣言は初期値を省略可能だが、コンストラクタが必要なので以下はエラー
        // age: number;
    }
    const uhyo2 = new User2();
    console.log(uhyo2.name);
    console.log(uhyo2.age);
    // uhyo2.age = 2; // readonlyなのでエラー
};

// メソッドを宣言
const sentence5_1_3 = () => {
    // クラス宣言の中にメソッドの宣言を書くことができる
    // オブジェクトリテラルのメソッド記法と同じ
    class User {
        name: string = "";
        age: number = 0;

        isAdult(): boolean {
            return this.age >= 20;
        }

        setAge(newAge: number): void {
            this.age = newAge;
        }
    }

    const uhyo = new User();
    console.log(uhyo.isAdult());
    uhyo.setAge(26);
    console.log(uhyo.isAdult());
};

// コンストラクタ
// new によってインスタンスが作成される際に呼び出される関数
const sentence5_1_4 = () => {
    class User {
        name: string;
        readonly age: number;

        constructor(name: string, age: number) {
            this.name = name;
            // コンストラクタでは読み取り専用のプロパティも書き換え可能
            this.age = age;
        }

        // コンストラクタ以外ではエラー
        // setAge(newAge: number): void {
        //     this.age = newAge;
        // }

        isAdult(): boolean {
            return this.age >= 20;
        }
    }
    const uhyo = new User("uhyo", 26);
    console.log(uhyo.name);
    console.log(uhyo.isAdult());
};

// 静的プロパティ・静的メソッド
// プロパティ、メソッドの前にstaticをつける
// インスタンスではなく、クラスそのものに属する
const sentence5_1_5 = () => {
    class User {
        static adminName: string = "uhyo";
        static getAdminUser() {
            return new User(User.adminName, 26);
        }


        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        isAdult(): boolean {
            return this.age >= 20;
        }
    }
    console.log(User.adminName);
    const admin = User.getAdminUser();
    console.log(admin.name);
    console.log(admin.isAdult());
    const uhyo = new User("uhyo", 26);
    // console.log(uhyo.adminName); // インスタンスからはアクセスできない
};

// 3種類のアクセシビリティ修飾子
// public: どこからでもアクセス可能
// private: クラスの内部からのみアクセス可能
// protected: クラスの内部、サブクラスからのみアクセス可能
const sentence5_1_6 = () => {
    class User {
        name: string;
        private age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        public isAdult(): boolean {
            return this.age >= 20;
        }
    }

    const uhyo = new User("uhyo", 26);
    console.log(uhyo.name);
    console.log(uhyo.isAdult());
    // console.log(uhyo.age); // privateなのでエラー
};

// コンストラクタ引数でのプロパティ宣言
const sentence5_1_7 = () => {
    // コンストラクタ引数にアクセシビリティ修飾子をつけると、その引数に対応するプロパティが宣言される
    class User {
        // publicの場合も明示が必要
        // 引数名がそのままプロパティ名になる
        // この記法はTypeScript特有でJavaScriptには存在しないため、この記法を使わない人もいる
        constructor(public name: string, private age: number) {
        }
    }
};

// クラス式でクラスを作成する
// 関数宣言と関数式の関係に似ている
// class {...} という構文でクラスを作成する
// クラス式の中ではprivateやprotectedなプロパティが使用不可能であるため注意が必要
const sentence5_1_8 = () => {
    const User = class {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        public isAdult(): boolean {
            return this.age >= 20;
        }
    }
    // Userは今までと同様に使える
    const uhyo = new User("uhyo", 26);
    console.log(uhyo.name);
    console.log(uhyo.isAdult());
};

// もう1つのプライベートプロパティ
// # プロパティ名 のように # をつけるとプライベートプロパティになる
// privateはTypeScript特有である一方、#はJavaScriptの機能なのでランタイムでもprivate性が守られるので迷ったら#を使ったほうがいい
// TypeScriptを使っているならコンパイル時チェックでprivate性が守られているか確認できるので、privateでも問題ないという意見もある
const sentence5_1_9 = () => {
    class User {
        name: string;
        #age: number;

        constructor(name: string, age: number) {
            this.name = name;
            // #を含んだプロパティ名でアクセス
            // this["#age"]ではアクセス出来ない
            this.#age = age;
        }

        public isAdult(): boolean {
            return this.#age >= 20;
        }
    }

    const uhyo = new User("uhyo", 26);
    console.log(uhyo.name);
    console.log(uhyo.isAdult());
    // console.log(uhyo.#age); // エラー
};

// クラスの静的初期化ブロック
// staticブロック
// クラス宣言の中に static {...} という構文で記述する
const sentence5_1_10 = () => {
    console.log("Hello");
    class C {
        static {
            console.log("uhyo");
        }
    }
    console.log("world");

    class User {
        static adminUser: User;
        // staticブロックを使用することで #ageに本来は設定不可能な値を設定できる
        static {
            // thisは今宣言されているクラスオブジェクトそのもの
            this.adminUser = new User();
            this.adminUser.#age = 9999;
        }

        #age: number = 0;
        getAge() {
            return this.#age;
        }
        setAge(age: number) {
            if (age < 0 || age > 150) {
                return;
            }
            this.#age = age;
        }
    }
    console.log(User.adminUser.getAge());
};

// 型引数を持つクラス
const sentence5_1_11 = () => {
    class User<T> {
        name: string;
        #age: number;
        readonly data: T;

        constructor(name: string, age: number, data: T) {
            this.name = name;
            this.#age = age;
            this.data = data;
        }

        public isAdult(): boolean {
            return this.#age >= 20;
        }
    }
    const uhyo = new User<string>("uhyo", 26, "data");
    // dataはstring型
    const data = uhyo.data;

    const john = new User("John", 15, { num: 123 })
    // dataは{ num: number }型
    const data2 = john.data;
};

sentence5_1_1();
sentence5_1_2();
sentence5_1_3();
sentence5_1_4();
sentence5_1_5();
sentence5_1_6();
sentence5_1_7();
sentence5_1_8();
sentence5_1_9();
sentence5_1_10();
sentence5_1_11();