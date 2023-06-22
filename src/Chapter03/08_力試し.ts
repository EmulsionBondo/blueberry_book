// データ処理
const sentence3_8_1 = () => {
    type User = {
        name: String;
        age: number;
        premiumUser: boolean;
    };

    const data: string =
        `
uhyo,26,1
Hohn Smith,17,0
Mary Sue,14,1
`;
    const users: User[] = [];
    for (const line of data.split("\n")) {
        if (line === "") {
            continue;
        }
        const [name, age, premiumUser] = line.split(",");
        const user: User = {
            name: name,
            age: Number(age),
            premiumUser: Boolean(Number(premiumUser)),
        }
        users.push(user);
    }

    for (const user of users) {
        if (user.premiumUser) {
            console.log(`${user.name}はプレミアムユーザーです。`);
        }
        else {
            console.log(`${user.name}はプレミアムユーザーではありません。`);
        }
    }
};

// 別解（4.1.10などの知識を使う）
const sentence3_8_3 = () => {
    type User = {
        name: String;
        age: number;
        premiumUser: boolean;
    };

    const data: string =
        `
uhyo,26,1
Hohn Smith,17,0
Mary Sue,14,1
`;
    const users: User[] = data.split("\n")
        .filter(line => line !== "")
        .map(line => {
            const [name, ageString, premiumUserString] = line.split(",");

            return {
                name,
                age: Number(ageString),
                premiumUser: Boolean(Number(premiumUserString)),
            };
        });
    for (const user of users) {
        if (user.premiumUser) {
            console.log(`${user.name}はプレミアムユーザーです。`);
        }
        else {
            console.log(`${user.name}はプレミアムユーザーではありません。`);
        }
    }
};

sentence3_8_1();
sentence3_8_3();