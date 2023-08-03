// 継承
// (1) 子は親の機能を受け継ぐ
// class クラス名 extends 親クラス名 {...}
const sentence5_3_1_1 = () => {
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

    class PremiumUser extends User {
        rank: number = 1;
    }

    const uhyo = new PremiumUser("uhyo", 26);
    console.log(uhyo.name);
    console.log(uhyo.isAdult());
    console.log(uhyo.rank);

    function getMessage(u: User) {
        return `こんにちは、${u.name}さん！`;
    }

    const john = new User("John", 25);
    console.log(getMessage(john));
    // PremiumUserはUserの部分型なので引数に渡せる
    console.log(getMessage(uhyo));
};

// オーバーライド
const sentence5_3_2_1 = () => {
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

    class PremiumUser extends User {
        rank: number = 1;

        // オーバーライド
        public isAdult(): boolean {
            return true;
        }
    }

    const john = new User("John", 15);
    const taro = new PremiumUser("Taro", 25);
    console.log(john.isAdult());
    console.log(taro.isAdult());

    // オーバーライドには、子クラスのインスタンスは親クラスのインスタンスの部分型を満たす必要がある
    // UserクラスのisAdult は () => boolean という型なので
    // PremiumUserクラスのisAdult は () => boolean という型（あるいは部分型）を満たす必要がある
    // そのため、以下はエラー
    // class PremiumUser2 extends User {
    //     rank: number = 1;

    //     // オーバーライド
    //     public isAdult(): string {
    //         return "Adult";
    //     }
    // }

    // コンストラクタもオーバーライドできる
    // super呼び出しが必要
    class PremiumUser2 extends User {
        rank: number = 1;

        constructor(name: string, age: number, rank: number) {
            super(name, age); // 親クラスのコンストラクタを呼び出す。thisよりも先に呼ぶ必要がある
            this.rank = rank;
        }
    }

    const uhyo = new PremiumUser2("uhyo", 26, 2);
    console.log(uhyo.name);
    console.log(uhyo.isAdult());
    console.log(uhyo.rank);
};

// override修飾し
const sentence5_3_3_1 = () => {
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

    class PremiumUser extends User {
        rank: number = 1;
        // オバーライドではないものに対してoverride修飾子をつけるとエラー
        // override rank: number = 1;

        // オーバーライドを明示的に出来る（必須ではなく、挙動も変わらない）
        // noImplicitOverrideフラグをtrueにすると、明示的に書かないとエラーになる
        public override isAdult(): boolean {
            return true;
        }
    }
};

// privateとprotected
const sentence5_3_4_1 = () => {
    class User {
        name: string;
        // #age: number;
        protected age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        public isAdult(): boolean {
            return this.age >= 20;
        }
    }

    class PremiumUser extends User {
        public isAdult(): boolean {
            // 親クラスのprivateフィールドにはアクセスできない
            // return this.#age >= 20;
            // 子クラスからアクセスでき、クラスの外からはアクセスできないprotectedフィールドにする
            return this.age >= 20;
        }
    }
}

// 安易にprotectedを使うと複雑化・メンテナンス性の低下につながる
// privateをprotectedに変えると問題が発生する
const sentence5_3_4_2 = () => {
    // class User {
    //     name: string;
    //     private age: number;
    //     private _isAdult: boolean;

    //     constructor(name: string, age: number) {
    //         this.name = name;
    //         this.age = age;
    //         this._isAdult = age >= 20;
    //     }

    //     public isAdult(): boolean {
    //         return this._isAdult;
    //     }
    // }
    class User {
        name: string;
        protected age: number;
        private _isAdult: boolean;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
            this._isAdult = age >= 20;
        }

        public isAdult(): boolean {
            return this._isAdult;
        }
    }

    class PremiumUser extends User {
        // プレミアムユーザーは年齢を編集できる
        public setAge(newAge: number) {
            this.age = newAge;
        }
    }

    const uhyo = new PremiumUser("uhyo", 26);
    console.log(uhyo.isAdult());

    uhyo.setAge(19);
    console.log(uhyo.isAdult()); // falseが想定されるがtrueになってしまう
};

// implementsによるクラスの型チェック
// class クラス名 implements 型 {...}
// クラス名は、implementsした型の部分型であるという宣言
// implementsを使用しなくても要件を満たしていれば自動的に部分型になるが、
// 部分型にするという目的をチェックすることができる
const sentence5_3_5_1 = () => {
    type HasName = {
        name: string;
    }

    class User implements HasName {
        // nameを消すとエラー
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
};

sentence5_3_1_1();
sentence5_3_2_1();
sentence5_3_3_1();
sentence5_3_4_1();
sentence5_3_4_2();