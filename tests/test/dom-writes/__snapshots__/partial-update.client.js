// 14:10
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { setAttribute as _$setAttribute } from "solid-js/web";
import { effect as _$effect } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>update</button><table><tbody>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<tr><td>`);
export default ($0, $1) => {
  const rows = [1, 2, 3, 4].map(id => ({
    id: id,
    label: $0()("row " + id)
  }));
  const update = () => {
    for (let index = 0; index < rows.length; index = index + 2) {
      const label = rows[index].label;
      label[1](label[0]() + " !!!");
    }
  };
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling,
      _el$4 = _el$3.firstChild;
    _el$2.$$click = update;
    _$insert(_el$4, _$createComponent($1, {
      each: rows,
      children: row => (() => {
        var _el$5 = _tmpl$2(),
          _el$6 = _el$5.firstChild;
        _$insert(_el$6, () => row.label[0]());
        _$effect(() => _$setAttribute(_el$5, "id", "row-" + row.id));
        return _el$5;
      })()
    }));
    return _el$;
  })();
};
_$delegateEvents(["click"]);
