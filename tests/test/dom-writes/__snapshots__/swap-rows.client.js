// 13:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { setAttribute as _$setAttribute } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>swap</button><table><tbody>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<tr><td>`);
export default ($0, $1) => {
  const ids = $0()([1, 2, 3, 4, 5]);
  const swap = () => {
    const held = ids[0]();
    ids[1](held.with(1, held[3]).with(3, held[1]));
  };
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling,
      _el$4 = _el$3.firstChild;
    _el$2.$$click = swap;
    _$insert(_el$4, _$createComponent($1, {
      get each() {
        return ids[0]();
      },
      children: id => (() => {
        var _el$5 = _tmpl$2(),
          _el$6 = _el$5.firstChild;
        _$setAttribute(_el$5, "id", "row-" + id);
        _$insert(_el$6, "row " + id);
        return _el$5;
      })()
    }));
    return _el$;
  })();
};
_$delegateEvents(["click"]);
