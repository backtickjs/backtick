// 24:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<span>`);
export default ($0, $1, $2) => {
  const flag = $0()(true);
  const tone = $0()($1());
  const step = $0()(() => 0);
  return (() => {
    var _el$ = _tmpl$();
    _el$.$$click = () => {
      flag[1](false);
      tone[1]($2());
      step[1](() => () => 1);
    };
    _$insert(_el$, () => flag[0]() + " " + tone[0]() + " " + step[0]()());
    return _el$;
  })();
};
_$delegateEvents(["click"]);
