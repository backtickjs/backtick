// 26:5
($splice0) => {
    const stop = $splice0().clearInterval;
    const repeating = $splice0().setInterval(() => 0, 1000);
    stop(repeating);
    $splice0().clearTimeout($splice0().setTimeout(() => 0, 1000));
}
