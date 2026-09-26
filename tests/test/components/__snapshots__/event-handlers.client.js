// 16:5
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<form><textarea></textarea><input><button>`);
export default $0 => {
  const said = $0()("");
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling,
      _el$4 = _el$3.nextSibling;
    _el$.addEventListener("submit", event => {
      event.preventDefault();
      said[1](event.type + " " + event.cancelable);
    });
    _el$2.$$input = event => said[1](event.currentTarget.value);
    _el$3.$$input = event => said[1](event.currentTarget.value);
    _el$4.$$click = event => said[1](event.clientX + " " + event.currentTarget.tagName);
    _$insert(_el$4, () => said[0]());
    return _el$;
  })();
};
_$delegateEvents(["input", "click"]);
