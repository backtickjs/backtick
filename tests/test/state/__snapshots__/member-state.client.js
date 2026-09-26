// 20:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><ul class=rows>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<li>`);
export default ($0, $1) => {
  const build = from => {
    return Array.from({
      length: 3
    }, (_, at) => {
      return {
        id: from + at,
        label: $0()("row " + (from + at))
      };
    });
  };
  const held = $0()(build(1));
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    _$insert(_el$2, _$createComponent($1, {
      get each() {
        return held[0]();
      },
      children: row => (() => {
        var _el$3 = _tmpl$2();
        _el$3.$$click = () => row.label[1]("pressed");
        _$insert(_el$3, () => row.label[0]());
        return _el$3;
      })()
    }));
    return _el$;
  })();
};
_$delegateEvents(["click"]);
