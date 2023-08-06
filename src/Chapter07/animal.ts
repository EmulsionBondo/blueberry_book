// type の前にexport
// export type Animal = {
//     species: string;
//     age: number;
// }

// export {} 構文
type Animal = {
    species: string;
    age: number;
}

const tama: Animal = {
    species: "cat",
    age: 1,
};

export { Animal, tama };
// export type {Animal, tama} と書くと
// 型としてのみ使用することができる
// export type { Animal, tama };