import { createInterface } from "readline";

// if文の基本
// 基本：if(条件式) 文
const sentence2_5_1 = () => {
    let userName = "";
    if (userName === "") userName = "名無し";
};

// else
const sentence2_5_3 = () => {
    let userName = "";
    if (userName !== "") {
        console.log("ちゃんと名前があってえらい！")
    } else {
        console.log("名前を入力してください!");
        userName = "名無し";
    }
};

// switch文
// switch(式) と case 式の一致判定は === で行われる
const sentence2_5_4 = () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("コマンドを入力してください: ", (name) => {
        switch (name) {
            case "greet":
                console.log("こんにちは！");
                break;
            case "cat":
                console.log("にゃーん");
                break;
            default:
                console.log(`コマンド 「${name}」を認識できませんでした`);
        }
        rl.close();
    });
};

// while文
const sentence2_5_5 = () => {
    let sum = 0;
    let i = 1;
    while (i <= 100) {
        sum += i;
        i++;
    }
    console.log(sum);

    sum = 0;
    i = 1;
    while (true) {
        if (i > 100) break;
        sum += i;
        i++;
    }
    console.log(sum);
};

// for文
const sentence2_5_6 = () => {
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
        sum += i;
    }
    console.log(sum);
};

sentence2_5_1();
sentence2_5_3();
sentence2_5_4();
sentence2_5_5();
sentence2_5_6();
