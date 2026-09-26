// 111:12
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { effect as _$effect } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><input aria-label=text><input type=checkbox aria-label=on><button>write`);
export default $0 => {
  const text = $0()("first");
  const isOn = $0()(false);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling,
      _el$4 = _el$3.nextSibling;
    _el$4.$$click = () => {
      text[1]("second");
      isOn[1](true);
    };
    _$effect(() => _el$2.value = text[0]());
    _$effect(() => _el$3.checked = isOn[0]());
    return _el$;
  })();
};
_$delegateEvents(["click"]);
