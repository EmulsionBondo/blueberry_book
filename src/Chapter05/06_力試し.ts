const sentence5_6_1 = () => {
    class User {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        public getMessage(): string {
            return `こんにちは ${this.name} さん`;
        }
    }

    const uhyo = new User("uhyo", 30);
    console.log(uhyo.getMessage());
};

const sentence5_6_3 = () => {
    function createUser(name: string, age: number) {
        return (message: string) => {
            return `${name} ${age} 「${message}」`;
        }
    }

    const getMessage = createUser("uhyo", 30);
    console.log(getMessage("こんにちは"));
};

sentence5_6_1();
sentence5_6_3();