// 29:14
export default ($0, $1) => "font-size: " + ($0()[0]() === $1() ? 20 : 16) + "px";

// 31:8
export default ($0, $1) => "row " + $0() + " of " + $1()[0]();

// 33:6
export default ($0, $1, $2) => $0()[0]() === $1() ? $2() : null;

// 38:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><span>select`);
export default ($0, $1) => {
  const selected = $0()(0);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    _el$2.$$click = () => selected[1](1);
    _$insert(_el$, _$createComponent($1, {
      id: 0,
      selected: selected
    }), null);
    _$insert(_el$, _$createComponent($1, {
      id: 1,
      selected: selected
    }), null);
    return _el$;
  })();
};
_$delegateEvents(["click"]);
