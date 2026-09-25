// 11:5
export default () => {
    let count = 0;
    const bump = () => {
        count = count + 1;
        return count;
    };
    return bump() + bump();
};
