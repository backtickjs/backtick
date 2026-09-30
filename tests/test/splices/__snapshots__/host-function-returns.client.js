// 17:46
($splice0) => $splice0() + 1

// 19:3
($splice0, $splice1) => $splice0() * $splice1()

// 26:5
($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6, $splice7, $splice8, $splice9) => {
    const none = $splice0()(1);
    const missing = $splice1()(1);
    const number = $splice2()(1);
    const boolean = $splice3()(1);
    const string = $splice4()(1);
    const array = $splice5()(3);
    const object = $splice6()(4);
    const script = $splice7()(5);
    const called = $splice8()(6)(7);
    const element = $splice9()(8);
    return {
        none: none,
        missing: missing,
        number: number,
        boolean: boolean,
        string: string,
        array: array,
        object: object,
        script: script,
        called: called,
        element: element,
    };
}
