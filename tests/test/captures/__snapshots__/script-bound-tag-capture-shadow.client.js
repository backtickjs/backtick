// 16:10
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<i>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<p>`);
export default ($0, $1) => {
  const Card = props => (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, () => $0() + props.n);
    return _el$;
  })();
  return (() => {
    var _el$2 = _tmpl$2();
    _$insert(_el$2, () => $1(Card));
    return _el$2;
  })();
};

// 18:18
import { createComponent as _$createComponent } from "solid-js/web";
export default $0 => _$createComponent($0, {
  n: 1
});

// 26:5
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div>`);
export default ($0, $1, $2) => (() => {
  var _el$ = _tmpl$();
  _$insert(_el$, _$createComponent($2, {
    title: "host"
  }), null);
  _$insert(_el$, $0, null);
  _$insert(_el$, $1, null);
  return _el$;
})();

// 28:19
export default () => "a";

// 29:19
export default () => "b";

// 41:5
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<section>`),
  _tmpl$3 = /*#__PURE__*/_$template(`<i>`);
export default $0 => {
  const twice = Card => (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, _$createComponent(Card, {
      n: 1
    }), null);
    _$insert(_el$, _$createComponent(Card, {
      n: 2
    }), null);
    return _el$;
  })();
  return (() => {
    var _el$2 = _tmpl$2();
    _$insert(_el$2, _$createComponent($0, {
      title: "host"
    }), null);
    _$insert(_el$2, () => twice(props => (() => {
      var _el$3 = _tmpl$3();
      _$insert(_el$3, () => "row " + props.n);
      return _el$3;
    })()), null);
    return _el$2;
  })();
};
