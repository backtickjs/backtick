// 10:33
export default () => [5, 31, 7]["0"];

// 11:33
export default () => "abc"["0"];

// 13:33
export default () => ({
  x: 1
})[0];

// 14:33
export default () => 7[0];

// 20:7
export default () => [5, 31, 7][9];

// 21:7
export default () => [5, 31, 7][1.5];

// 22:7
export default () => [5, 31, 7][-1];

// 23:7
export default () => ({
  x: 1
})["y"];

// 24:7
export default () => "abc"[9];
