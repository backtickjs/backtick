// 9:33
() => null === null

// 10:33
() => undefined === undefined

// 14:33
() => null !== undefined

// 15:33
() => null === undefined

// 24:22
($splice0, $splice1) => {
    const names = ["a"];
    return [
        $splice0() === undefined,
        $splice0() !== null,
        $splice1() === null,
        $splice1() !== undefined,
        names[1] === undefined,
        names[1] !== null,
    ];
}
