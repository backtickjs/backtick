// 15:3
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<b>`);
export default () => props => (() => {
  var _el$ = _tmpl$();
  _$insert(_el$, () => "count " + props.count);
  return _el$;
})();

// 19:24
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>more`);
export default ($0, $1) => {
  const count = $0()(0);
  const Badge = eval($1());
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    _$insert(_el$, _$createComponent(Badge, {
      get count() {
        return count[0]();
      }
    }), _el$2);
    _el$2.$$click = () => count[1](count[0]() + 1);
    return _el$;
  })();
};
_$delegateEvents(["click"]);
