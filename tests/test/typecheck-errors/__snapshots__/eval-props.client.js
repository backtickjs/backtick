// 14:10
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<em>`);
export default $0 => (() => {
  var _el$ = _tmpl$();
  _$insert(_el$, () => "rows " + $0());
  return _el$;
})();

// 18:10
import { template as _$template } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<em>nothing to hand it`);
export default () => _tmpl$();

// 22:3
export default $0 => props => $0(props);

// 22:51
export default $0 => $0.count;

// 27:16
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div>`);
export default ($0, $1) => {
  const Rows = eval($0());
  const Empty = eval($1());
  const wrongType = _$createComponent(Rows, {
    count: "one"
  });
  const unknownName = _$createComponent(Rows, {
    nope: 1
  });
  const missing = _$createComponent(Rows, {});
  const called = _$createComponent(Empty, {
    count: 1
  });
  return (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, _$createComponent(Rows, {
      count: 1
    }), null);
    _$insert(_el$, Empty, null);
    _$insert(_el$, wrongType, null);
    _$insert(_el$, unknownName, null);
    _$insert(_el$, missing, null);
    _$insert(_el$, called, null);
    _$insert(_el$, () => eval(null), null);
    return _el$;
  })();
};
