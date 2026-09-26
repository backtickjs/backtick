// 13:10
import { template as _$template } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<i>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<section>`);
export default $0 => {
  const Badge = p => (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, () => "panel " + p.n);
    return _el$;
  })();
  return (() => {
    var _el$2 = _tmpl$2();
    _$insert(_el$2, _$createComponent(Badge, {
      n: 0
    }), null);
    _$insert(_el$2, () => $0().body, null);
    return _el$2;
  })();
};

// 28:31
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<b>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<div><button>more`);
export default ($0, $1, $2) => {
  const count = $0()(0);
  const Badge = p => (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, () => "outer " + p.n, null);
    _$insert(_el$, () => p.children, null);
    return _el$;
  })();
  return (() => {
    var _el$2 = _tmpl$2(),
      _el$3 = _el$2.firstChild;
    _$insert(_el$2, _$createComponent($2, {
      get body() {
        return $1(count, Badge);
      }
    }), _el$3);
    _el$3.$$click = () => count[1](count[0]() + 1);
    return _el$2;
  })();
};
_$delegateEvents(["click"]);

// 41:13
import { template as _$template } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<u>`);
export default ($0, $1) => _$createComponent($0, {
  get n() {
    return $1[0]();
  },
  get children() {
    var _el$ = _tmpl$();
    _$insert(_el$, () => "kid " + $1[0]());
    return _el$;
  }
});
