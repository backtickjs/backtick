import { cs } from '@backtick/core';

const obj = cs`{a: 4}`;
const script = cs`{
  const obj = ${obj};
  return ${cs`obj.a`};
}`;

export default script;
