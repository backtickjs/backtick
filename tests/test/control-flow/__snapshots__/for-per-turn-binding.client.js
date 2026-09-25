// 12:5
export default () => {
    let last = () => 0;
    for (let i = 0; i < 3; i = i + 1) {
        last = () => i;
    }
    return last();
};
