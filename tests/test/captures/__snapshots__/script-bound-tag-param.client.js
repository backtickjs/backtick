// 13:5
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<ul>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<li>`);
export default ($0, $1) => {
  const twice = Row => (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, () => $0(Row), null);
    _$insert(_el$, () => $1(Row), null);
    return _el$;
  })();
  return twice(p => (() => {
    var _el$2 = _tmpl$2();
    _$insert(_el$2, () => "row " + p.n);
    return _el$2;
  })());
};

// 16:14
import { createComponent as _$createComponent } from "solid-js/web";
export default $0 => _$createComponent($0, {
  n: 1
});

// 17:14
import { createComponent as _$createComponent } from "solid-js/web";
export default $0 => _$createComponent($0, {
  n: 2
});
