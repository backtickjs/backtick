// 17:3
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<b>`);
export default () => props => (() => {
  var _el$ = _tmpl$();
  _$insert(_el$, () => "count " + props.count);
  return _el$;
})();

// 20:31
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { memo as _$memo } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>load</button><button>more`),
  _tmpl$2 = /*#__PURE__*/_$template(`<i>loading`);
export default ($0, $1) => {
  const count = $0()(0);
  const drawn = $0()(null);
  const Badge = props => {
    const held = drawn[0]();
    return held === null ? null : eval(held)(props);
  };
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    _$insert(_el$, (() => {
      var _c$ = _$memo(() => drawn[0]() === null);
      return () => _c$() ? _tmpl$2() : _$createComponent(Badge, {
        get count() {
          return count[0]();
        }
      });
    })(), _el$2);
    _el$2.$$click = () => drawn[1]($1());
    _el$3.$$click = () => count[1](count[0]() + 1);
    return _el$;
  })();
};
_$delegateEvents(["click"]);
