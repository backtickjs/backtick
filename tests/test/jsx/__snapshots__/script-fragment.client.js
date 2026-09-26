// 11:16
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<span>a sentence across lines`),
  _tmpl$2 = /*#__PURE__*/_$template(`<span> `);
export default () => name => [_tmpl$(), (() => {
  var _el$2 = _tmpl$2(),
    _el$3 = _el$2.firstChild;
  _$insert(_el$2, name, _el$3);
  _$insert(_el$2, name, null);
  return _el$2;
})()];

// 21:49
export default $0 => $0()("x");
