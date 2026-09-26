// 29:9
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<p>`);
export default ($0, $1, $2) => {
  const count = $0()(0);
  $1()(() => {
    $2().console.log();
    count[1](count[0]() + 1);
  });
  return (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, () => "mounted " + count[0]());
    return _el$;
  })();
};

// 45:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<button>`);
export default ($0, $1) => {
  const said = $0()("not yet");
  return (() => {
    var _el$ = _tmpl$();
    _el$.$$click = () => $1()(() => said[1]("ran"));
    _$insert(_el$, () => said[0]());
    return _el$;
  })();
};
_$delegateEvents(["click"]);
