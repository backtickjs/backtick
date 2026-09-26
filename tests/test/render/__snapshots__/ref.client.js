// 13:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { use as _$use } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><input aria-label=name><button>edit`);
export default $0 => {
  const field = $0()(null);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    _$use(element => field[1](element), _el$2);
    _el$3.$$click = () => field[0]()?.focus();
    return _el$;
  })();
};
_$delegateEvents(["click"]);

// 29:7
import { template as _$template } from "solid-js/web";
import { use as _$use } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<input aria-label=name>`);
export default $0 => {
  return (() => {
    var _el$ = _tmpl$();
    _$use(element => $0()(() => element.focus()), _el$);
    return _el$;
  })();
};

// 42:18
import { template as _$template } from "solid-js/web";
import { use as _$use } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<input aria-label=name>`);
export default () => (() => {
  var _el$ = _tmpl$();
  _$use(() => {}, _el$);
  return _el$;
})();

// 64:9
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { use as _$use } from "solid-js/web";
import { memo as _$memo } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<p>shown`);
export default ($0, $1) => {
  const shown = $0()(true);
  const n = $0()(0);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    _el$2.$$click = () => n[1](n[0]() + 1);
    _$insert(_el$2, () => "n " + n[0]());
    _$insert(_el$, (() => {
      var _c$ = _$memo(() => !!shown[0]());
      return () => _c$() ? (() => {
        var _el$3 = _tmpl$2();
        _$use(() => $1().console.log(n[0]()), _el$3);
        return _el$3;
      })() : null;
    })(), null);
    return _el$;
  })();
};
_$delegateEvents(["click"]);
