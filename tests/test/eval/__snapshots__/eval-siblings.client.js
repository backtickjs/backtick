// 9:10
import { template as _$template } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<em>from another bundle`);
export default () => _tmpl$();

// 18:5
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><span>before</span><span>after`);
export default $0 => (() => {
  var _el$ = _tmpl$(),
    _el$2 = _el$.firstChild,
    _el$3 = _el$2.nextSibling;
  _$insert(_el$, () => eval($0()), _el$3);
  return _el$;
})();
