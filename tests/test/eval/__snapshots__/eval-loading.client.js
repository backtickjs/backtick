// 18:5
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { memo as _$memo } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<span>loading…`);
export default $0 => {
  const held = $0()(null);
  return (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, (() => {
      var _c$ = _$memo(() => held[0]() === null);
      return () => _c$() ? _tmpl$2() : eval(held[0]());
    })());
    return _el$;
  })();
};
