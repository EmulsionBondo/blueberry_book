// Node.js の組み込みモジュール
import { createInterface } from "readline";

const sentence7_2_1 = () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("文字列を入力してください。", (line) => {
        console.log(`「${line}」と入力しました。`);
        rl.close();
    });
};

// import fastify from "fastify";

// const app = fastify();

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.listen(8080);