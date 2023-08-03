// クラス宣言はインスタンスの型を作る
const sentence5_2_1_1 = () => {
    class User {
        name: string = "";
        age: number = 0;

        isAdult(): boolean {
            return this.age >= 20;
        }
    }

    const uhyo: User = new User();
    // 以下もok
    const john: User = {
        name: "John Smith",
        age: 15,
        isAdult: () => true
    };
};

const sentence5_2_1_2 = () => {
    // クラス式で作る
    const User = class {
        name: string = "";
        age: number = 0;

        isAdult(): boolean {
            return this.age >= 20;
        }
    };
    // 以下はok
    const uhyo = new User();
    // クラス式の場合User型は作られない
    // const john: User = {
    //     name: "John Smith",
    //     age: 15,
    //     isAdult: () => true
    // };
};

const sentence5_2_1_3 = () => {
    class User<T> {
        name: string;
        #age: number;
        readonly id: T;

        constructor(name: string, age: number, id: T) {
            this.name = name;
            this.#age = age;
            this.id = id;
        }
    }
    // 型引数を持つクラス宣言は型引数を持つ型が作られる
    const uhyo: User<string> = new User("uhyo", 26, "ABC");
};

// newシグネチャによるインスタンス化可能性の表現
// クラスオブジェクトは new クラスオブジェクト() という式でインスタンスを作成できる
const sentence5_2_2_1 = () => {
    class User {
        name: string = "";
        age: number = 0;
    }
    // クラスオブジェクトそのものの型は
    // new (引数リスト) => インスタンスの型　という記法で表現できる
    type MyUserConstructor = new () => User;
    // UserはMyUSerConstructor型を持つ
    const MyUser: MyUserConstructor = User;
    // MyUserはnewで使用可能
    const u = new MyUser();
    // uはUser型
    console.log(u.name, u.age);

    // new シグネチャ
    type MyUserConstructor2 = {
        // オブジェクト型の中で使用
        new(): User;
    };
};

// instanceof演算子と型の絞り込み
// 与えられたオブジェクトがあるクラスのインスタンスかどうかを判断
const sentence5_2_3_1 = () => {
    class User {
        name: string = "";
        age: number = 0;
    }

    const uhyo = new User();
    console.log(uhyo instanceof User); // true
    console.log({} instanceof User); // false

    const john: User = {
        name: "John Smith",
        age: 15
    };
    // johnはUser型であるが、Userのインスタンスではない
    // Userのインスタンスは new User() で作成されたオブジェクトを指す
    console.log(john instanceof User); // false
};

const sentence5_2_3_2 = () => {
    type HasAge = {
        age: number;
    }
    class User {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }

    function getPrice(customer: HasAge): number {
        if (customer instanceof User) {
            if (customer.name == "uhyo") {
                return 0;
            }
        }
        return customer.age < 18 ? 1000 : 1800;
    }

    const customer1: HasAge = { age: 15 };
    const customer2: HasAge = { age: 40 };
    const uhyo = new User("uhyo", 30);

    console.log(getPrice(customer1));
    console.log(getPrice(customer2));
    console.log(getPrice(uhyo));
}
sentence5_2_1_1();
sentence5_2_1_2();
sentence5_2_1_3();
sentence5_2_2_1();
sentence5_2_3_1();
sentence5_2_3_2();