// 35:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<span>clear`),
  _tmpl$2 = /*#__PURE__*/_$template(`<span>`);
export default ($0, $1) => {
  const ids = $0()([1, 2, 3]);
  const clear = () => {
    ids[1]([]);
  };
  return [(() => {
    var _el$ = _tmpl$();
    _el$.$$click = clear;
    return _el$;
  })(), _$createComponent($1, {
    get each() {
      return ids[0]();
    },
    children: id => (() => {
      var _el$2 = _tmpl$2();
      _$insert(_el$2, "row " + id);
      return _el$2;
    })()
  })];
};
_$delegateEvents(["click"]);
