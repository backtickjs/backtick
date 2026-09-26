// 15:5
export default ($0, $1) => ({
  under: $0() < $1(),
  atMost: $0() <= $1(),
  over: $1() > $0(),
  between: $0() < $1() && $1() > $0()
});
