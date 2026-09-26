// 13:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { style as _$style } from "solid-js/web";
import { effect as _$effect } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<span>press`);
export default $0 => {
  const size = $0()(16);
  return (() => {
    var _el$ = _tmpl$();
    _el$.$$click = () => {
      size[1](size[0]() + 1);
    };
    _$effect(_$p => _$style(_el$, "font-size: " + size[0]() + "px", _$p));
    return _el$;
  })();
};
_$delegateEvents(["click"]);
