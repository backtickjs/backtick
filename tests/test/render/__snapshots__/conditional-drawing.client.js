// 32:10
import { template as _$template } from "solid-js/web";
import { memo as _$memo } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<em>shown`),
  _tmpl$2 = /*#__PURE__*/_$template(`<i>waiting`);
export default ($0, $1, $2) => {
  const shown = $0()(false);
  const started = $1().setTimeout(() => {
    if ($2()()) {
      shown[1](true);
    }
  }, 0);
  return _$memo(() => _$memo(() => !!shown[0]())() ? _tmpl$() : _tmpl$2());
};

// 45:28
import { template as _$template } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><span></span><section>`);
export default ($0, $1) => {
  const builds = $0()(0);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    _$insert(_el$2, () => "builds " + builds[0]());
    _$insert(_el$3, _$createComponent($1, {
      again: () => {
        builds[1](builds[0]() + 1);
        return builds[0]() < 5;
      }
    }));
    return _el$;
  })();
};
