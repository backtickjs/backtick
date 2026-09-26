// 16:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { memo as _$memo } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<button id=row style=display:flex;gap:8px><span style=font-weight:700></span><span>`);
export default $0 => {
  const count = $0()(0);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    _el$.$$click = () => count[1](count[0]() + 1);
    _$insert(_el$2, () => count[0]() > 0 ? "☑" : "☐");
    _$insert(_el$3, () => "pressed " + count[0]() + " times");
    return _el$;
  })();
};
_$delegateEvents(["click"]);
