// 11:5
export default () => {
    const held = { n: 1, q: "ada" };
    const written = Object.fromEntries(Object.entries(held).map((pair) => [pair[0], JSON.stringify(pair[1])]));
    return written.n + " " + written.q;
};
