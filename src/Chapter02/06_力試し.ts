const sentence2_6_1 = () => {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        }
        else if (i % 3 === 0) {
            console.log("Fizz");
        }
        else if (i % 5 === 0) {
            console.log("Buzz");
        }
        else {
            console.log(i);
        }
    }
};

const sentence2_6_2 = () => {
    let result: string = "";
    for (let i = 1; i <= 100; i++) {
        if (i > 1) result += " ";
        if (i % 3 === 0 && i % 5 === 0) {
            result += "FizzBuzz";
        }
        else if (i % 3 === 0) {
            result += "Fizz";
        }
        else if (i % 5 === 0) {
            result += "Buzz";
        }
        else {
            result += String(i);
        }
    }
    console.log(result);
};

sentence2_6_1();
sentence2_6_2();