const sentence4_6_1 = () => {
    const getFizzBuzzString = function (num: number): string {
        if (num % 15 === 0) {
            return "FizzBuzz";
        } else if (num % 3 === 0) {
            return "Fizz";
        } else if (num % 5 === 0) {
            return "Buzz";
        }
        else {
            return num.toString();
        }
    };

    for (let i = 1; i <= 100; i++) {
        const message = getFizzBuzzString(i);
        console.log(message);
    }

    const sequence = function (start: number, end: number): number[] {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    };

    for (const i of sequence(1, 100)) {
        const message = getFizzBuzzString(i);
        console.log(message);
    }
};

// コールバック関数の練習
const sentence4_6_3 = () => {
    function map<Input, Output>(array: Input[], callback: (num: Input) => Output): Output[] {
        const result: Output[] = [];
        for (const item of array) {
            result.push(callback(item));
        }
        return result;
    }

    const data = [1, 1, 2, 3, 5, 8, 13];
    const result = map(data, (x) => x * 10);
    console.log(result);

    const data2 = [1, -3, -2, 8, 0, -1];
    console.log(map(data2, (x) => x >= 0));
};

sentence4_6_1();
sentence4_6_3();