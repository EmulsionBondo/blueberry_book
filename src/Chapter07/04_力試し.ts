import { readFileSync } from "fs";

const sentence7_4_1 = () => {
    const data = readFileSync("uhyo.txt", "utf-8");

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

import path from "path";
import { fileURLToPath } from "url";
const sentence7_4_3 = () => {
    const filePath = fileURLToPath(import.meta.url);
    console.log(filePath)
    const fileDir = path.dirname(filePath);
    console.log(fileDir);
    const dataFile = path.join(fileDir, "../../uhyo.txt");
    console.log(dataFile);
    const data = readFileSync(dataFile, "utf-8");
};

sentence7_4_1();
sentence7_4_3();