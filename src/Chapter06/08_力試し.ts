const sentence6_8_1 = () => {
    type Option<T> = {
        tag: "Some";
        value: T;
    } | {
        tag: "None";
    };

    function showNumberIfExsists(obj: Option<number>): void {
        if (obj.tag === "Some") {
            console.log(obj.value);
        }
    }

    const four: Option<number> = {
        tag: "Some",
        value: 4,
    };
    showNumberIfExsists(four);
};

const sentence6_8_3 = () => {
    type Option<T> = {
        tag: "Some";
        value: T;
    } | {
        tag: "None";
    };

    function isSome<T>(obj: Option<T>): obj is { tag: "Some"; value: T } {
        return obj.tag === "Some";
    };

    function showNumberIfExsists(obj: Option<number>): void {
        if (isSome(obj)) {
            console.log(obj.value);
        }
    }
};

const sentence6_8_5 = () => {
    type Some<T> = {
        tag: "Some";
        value: T;
    };
    type None = {
        tag: "None";
    };
    type Option<T> = Some<T> | None;

    function mapOption<T, U>(obj: Option<T>, callback: (value: T) => U): Option<U> {
        if (obj.tag === "Some") {
            return {
                tag: "Some",
                value: callback(obj.value),
            };
        } else {
            return obj;
        }
    }
    function doubleOption(obj: Option<number>): Option<number> {
        return mapOption(obj, (x) => x * 2);
    }
    const four: Option<number> = { tag: "Some", value: 4 };
    const nothing: Option<number> = { tag: "None" };

    console.log(doubleOption(four));
    console.log(doubleOption(nothing));
};

sentence6_8_1();
sentence6_8_3();
sentence6_8_5();