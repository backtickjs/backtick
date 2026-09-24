// 26:5
$0 => {
    const stop = $0().clearInterval;
    const repeating = $0().setInterval(() => 0, 1000);
    stop(repeating);
    $0().clearTimeout($0().setTimeout(() => 0, 1000));
}
