// 19:49
export default $0 => c => {
  return c === $0() ? "blue" : "red";
};

// 24:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<span>`);
export default ($0, $1, $2, $3) => {
  const held = $0()($1());
  return (() => {
    var _el$ = _tmpl$();
    _el$.$$click = () => held[1]($2());
    _$insert(_el$, () => $3()(held[0]()));
    return _el$;
  })();
};
_$delegateEvents(["click"]);
