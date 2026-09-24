// 15:5
$0 => (currency) => {
    const table = $0();
    const asked = table[currency] ?? 0;
    const usd = table["usd"] ?? 0;
    return asked + usd;
}
