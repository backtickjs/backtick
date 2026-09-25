// 9:10
export default () => {
    const whole = Number.parseInt("42px");
    const based = Number.parseInt("ff", 16);
    const fractional = Number.parseFloat("1.5");
    return <span>{whole + based + fractional + ""}</span>;
};
