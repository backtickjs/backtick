// 28:7
import { template as _$template } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<p>drawn`);
export default ($0, $1) => {
  $0()(() => $1().console.log());
  return _tmpl$();
};

// 40:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<button>`);
export default ($0, $1, $2, $3) => {
  const n = $0()(1);
  const doubled = $1()(() => {
    $2()(() => $3().console.log());
    return n[0]() * 2;
  });
  return (() => {
    var _el$ = _tmpl$();
    _el$.$$click = () => n[1](n[0]() + 1);
    _$insert(_el$, doubled);
    return _el$;
  })();
};
_$delegateEvents(["click"]);

// 74:7
import { template as _$template } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<p>ticking`);
export default ($0, $1, $2, $3) => {
  const timer = $0()(0);
  $1()(() => {
    timer[1]($2().setInterval(() => $2().console.log(), 5));
  });
  $3()(() => $2().clearInterval(timer[0]()));
  return _tmpl$();
};

// 94:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<button>press`);
export default ($0, $1) => {
  return (() => {
    var _el$ = _tmpl$();
    _el$.$$click = () => $0()(() => $1().console.log());
    return _el$;
  })();
};
_$delegateEvents(["click"]);
