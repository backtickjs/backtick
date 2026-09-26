// 25:5
() => {
    const stop = window.clearInterval;
    const repeating = window.setInterval(() => 0, 1000);
    stop(repeating);
    window.clearTimeout(window.setTimeout(() => 0, 1000));
}
