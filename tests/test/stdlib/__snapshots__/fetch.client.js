// 16:5
($splice0, $splice1) => () => {
    const held = $splice0()("waiting");
    $splice1()
        .fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", {
        signal: $splice1().AbortSignal.timeout(3000),
    })
        .then((response) => {
        if (response.status !== 200) {
            throw "answered " + response.status;
        }
        return response.json();
    })
        .then((value) => {
        held[1](value === null ? "null" : "a value");
    })
        .catch((error) => {
        held[1]("failed — " + String(error));
    });
    $splice1()
        .fetch("/cases", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Math.trunc", passed: true }),
    })
        .then((response) => response.text())
        .then((text) => {
        held[1](text);
    }, (error) => {
        held[1](String(error));
    });
    return held[0]();
}
