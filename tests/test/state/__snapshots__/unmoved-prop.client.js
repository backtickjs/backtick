// 14:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { setAttribute as _$setAttribute } from "solid-js/web";
import { effect as _$effect } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><span>select</span><div>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<a>`);
export default ($0, $1, $2) => {
  const selected = $0()(0);
  const isSelected = $1()(selected[0]);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    _el$2.$$click = () => selected[1](1);
    _$insert(_el$3, _$createComponent($2, {
      each: [0, 1, 2],
      children: id => (() => {
        var _el$4 = _tmpl$2();
        _$insert(_el$4, "row " + id);
        _$effect(() => _$setAttribute(_el$4, "href", isSelected(id) ? "#open" : "#closed"));
        return _el$4;
      })()
    }));
    return _el$;
  })();
};
_$delegateEvents(["click"]);
