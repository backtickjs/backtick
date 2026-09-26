// 19:5
($splice0) => {
    const page = JSON.parse($splice0());
    return page.rows[0] + " of " + page.count;
}
