// 12:31
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<b>`),
  _tmpl$2 = /*#__PURE__*/_$template(`<div><button>more`);
export default ($0, $1, $2, $3, $4) => {
  const count = $0()(0);
  const Badge = props => (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, () => "n " + props.n);
    return _el$;
  })();
  return (() => {
    var _el$2 = _tmpl$2(),
      _el$3 = _el$2.firstChild;
    _$insert(_el$2, () => $1(count, Badge), _el$3);
    _$insert(_el$2, () => $2(count, Badge), _el$3);
    _$insert(_el$2, () => $3(count, Badge), _el$3);
    _$insert(_el$2, () => $4(count, Badge), _el$3);
    _el$3.$$click = () => count[1](count[0]() + 1);
    return _el$2;
  })();
};
_$delegateEvents(["click"]);

// 18:10
import { createComponent as _$createComponent } from "solid-js/web";
export default ($0, $1) => _$createComponent($0, {
  get n() {
    return $1[0]();
  }
});

// 20:11
export default ($0, $1, $2) => {
  const skipped = 10;
  return $0($1, $2);
};

// 22:20
import { createComponent as _$createComponent } from "solid-js/web";
export default ($0, $1) => _$createComponent($0, {
  get n() {
    return $1[0]() + 100;
  }
});

// 25:21
import { createComponent as _$createComponent } from "solid-js/web";
export default ($0, $1) => _$createComponent($0, {
  get n() {
    return $1[0]() + 1000;
  }
});

// 27:11
import { createComponent as _$createComponent } from "solid-js/web";
export default ($0, $1, $2) => _$createComponent($0, {
  each: [1, 2],
  children: m => _$createComponent($1, {
    get n() {
      return m * $2[0]();
    }
  })
});
