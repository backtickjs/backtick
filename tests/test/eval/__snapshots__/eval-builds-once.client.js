// 43:10
import { template as _$template } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<em>answered`);
export default () => _tmpl$();

// 53:10
import { memo as _$memo } from "solid-js/web";
export default ($0, $1, $2) => {
  const drawn = $0()(null);
  const started = $1().setTimeout(() => drawn[1]($2()()), 0);
  return _$memo(() => _$memo(() => drawn[0]() === null)() ? null : eval(drawn[0]()));
};

// 66:24
import { template as _$template } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><span>`);
export default ($0, $1, $2) => {
  const asked = $0()(0);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    _$insert(_el$2, () => "asked " + asked[0]());
    _$insert(_el$, _$createComponent($2, {
      ask: () => {
        asked[1](asked[0]() + 1);
        return asked[0]() > 4 ? null : $1();
      }
    }), null);
    return _el$;
  })();
};
