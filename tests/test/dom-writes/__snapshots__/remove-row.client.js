// 13:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { setAttribute as _$setAttribute } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<table><tbody>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<tr><td><button>`);
export default ($0, $1) => {
  const ids = $0()([1, 2, 3, 4, 5]);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    _$insert(_el$2, _$createComponent($1, {
      get each() {
        return ids[0]();
      },
      children: id => (() => {
        var _el$3 = _tmpl$2(),
          _el$4 = _el$3.firstChild,
          _el$5 = _el$4.firstChild;
        _$setAttribute(_el$3, "id", "row-" + id);
        _el$5.$$click = () => ids[1](ids[0]().filter(each => each !== id));
        _$insert(_el$5, "remove " + id);
        return _el$3;
      })()
    }));
    return _el$;
  })();
};
_$delegateEvents(["click"]);
