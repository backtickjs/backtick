// 9:33
export default () => name => "hello " + name;

// 14:3
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<b>`);
export default () => props => (() => {
  var _el$ = _tmpl$();
  _$insert(_el$, () => "count " + props.count);
  return _el$;
})();

// 22:5
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><span>`);
export default ($0, $1) => (() => {
  var _el$ = _tmpl$(),
    _el$2 = _el$.firstChild;
  _$insert(_el$2, () => eval($0())("ada"));
  _$insert(_el$, () => eval($1())({
    count: 3
  }), null);
  return _el$;
})();
