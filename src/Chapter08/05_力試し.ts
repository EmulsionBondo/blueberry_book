import { readFile } from "fs/promises";

const sentence8_5_1 = async () => {
    const data = await readFile("uhyo.txt", "utf-8");

    let count = 0;
    let currentIndex = 0;
    while (true) {
        const nextIndex = data.indexOf("uhyo", currentIndex);
        if (nextIndex >= 0) {
            count++;
            currentIndex = nextIndex + 1;
        } else {
            break;
        }
    }
    console.log(count);
};

const sentence8_5_3 = async () => {
    const timeOut = (duration: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, duration);
        });
    }

    timeOut(1).then(() => {
        process.exit();
    });
    const data = await readFile("uhyo.txt", "utf-8");
    let count = 0;
    let currentIndex = 0;
    while (true) {
        const nextIndex = data.indexOf("uhyo", currentIndex);
        if (nextIndex >= 0) {
            count++;
            currentIndex = nextIndex + 1;
        } else {
            break;
        }
    }
    console.log(count);
};

// Promise.raceを使った例
const sentence8_5_3_2 = async () => {
    const sleep = (duration: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, duration);
        });
    }

    const errorAfter1ms = async () => {
        await sleep(1);
        throw new Error("Timeout");
    }

    const data = await Promise.race([
        readFile("uhyo.txt", "utf-8"),
        errorAfter1ms()
    ]).catch(() => {
        console.log("失敗しました");
        process.exit();
    })

    let count = 0;
    let currentIndex = 0;
    while (true) {
        const nextIndex = data.indexOf("uhyo", currentIndex);
        if (nextIndex >= 0) {
            count++;
            currentIndex = nextIndex + 1;
        } else {
            break;
        }
    }
    console.log(count);
};

// sentence8_5_1();
// sentence8_5_3();
sentence8_5_3_2();