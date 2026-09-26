// 12:10
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<span>`);
export default $0 => _$createComponent($0, {
  each: [1, 2, 3],
  children: n => (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, "item " + n);
    return _el$;
  })()
});

// 20:19
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><b>`);
export default ($0, $1) => (() => {
  var _el$ = _tmpl$(),
    _el$2 = _el$.firstChild;
  _$insert(_el$, () => eval($0()), _el$2);
  _$insert(_el$2, () => eval($1()) + 1);
  return _el$;
})();
