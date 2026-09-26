// 26:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>add</button><p></p><p></p><p>`);
export default ($0, $1, $2) => {
  const n = $0()(1);
  const doubled = $1()(() => {
    $2().console.log();
    return n[0]() * 2;
  });
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling,
      _el$4 = _el$3.nextSibling,
      _el$5 = _el$4.nextSibling;
    _el$2.$$click = () => n[1](n[0]() + 1);
    _$insert(_el$3, () => "a " + doubled());
    _$insert(_el$4, () => "b " + doubled());
    _$insert(_el$5, () => "c " + doubled());
    return _el$;
  })();
};
_$delegateEvents(["click"]);

// 52:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>add</button><p>`);
export default ($0, $1, $2) => {
  const n = $0()(1);
  const isBig = $1()(() => n[0]() > 2);
  const label = () => {
    $2().console.log();
    return isBig() ? "big" : "small";
  };
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    _el$2.$$click = () => n[1](n[0]() + 1);
    _$insert(_el$3, label);
    return _el$;
  })();
};
_$delegateEvents(["click"]);
