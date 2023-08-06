export const name = "uhyo";
export const age = 26;

// 以下のようにもかける
// const name = "uhyo";
// const age = 26;
// export { name, age };
// as new_name として別の名前でエクスポートすることも可能
// export { name as name2, age as age2 };

export const getUhyoName = () => {
    return "uhyo";
};