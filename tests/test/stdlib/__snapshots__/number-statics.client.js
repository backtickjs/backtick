// 9:10
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<span>`);
export default () => {
  const positive = Number.EPSILON > 0;
  const largest = Number.MAX_VALUE > 1e308;
  const safe = Number.MAX_SAFE_INTEGER === 9007199254740991 && Number.MIN_SAFE_INTEGER === -9007199254740991 && Number.MIN_VALUE > 0 && Number.isSafeInteger(3) && !Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1);
  const whole = Number.isInteger(2);
  const fractional = Number.isInteger(2.5);
  const written = Number.isFinite("2");
  return (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, whole + " " + fractional + " " + written + " " + positive + " " + largest + " " + safe);
    return _el$;
  })();
};
