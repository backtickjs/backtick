// 9:33
() => null === null

// 10:33
() => undefined === undefined

// 14:33
() => null !== undefined

// 15:33
() => null === undefined

// 24:22
($0, $1) => {
    const names = ["a"];
    return [
        $0() === undefined,
        $0() !== null,
        $1() === null,
        $1() !== undefined,
        names[1] === undefined,
        names[1] !== null,
    ];
}
