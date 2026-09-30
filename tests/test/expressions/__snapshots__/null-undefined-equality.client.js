// 10:40
() => () => null === null

// 11:40
() => () => undefined === undefined

// 15:40
() => () => null !== undefined

// 16:40
() => () => null === undefined

// 26:20
($splice0, $splice1) => () => {
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
