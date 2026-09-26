// 22:10
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<em>`);
export default ($0, $1, $2, $3, $4) => {
  const items = $0()([]);
  const started = $1().setTimeout(() => {
    if ($2()()) {
      items[1]($3());
    }
  }, 0);
  return _$createComponent($4, {
    get each() {
      return items[0]();
    },
    children: item => (() => {
      var _el$ = _tmpl$();
      _$insert(_el$, item);
      return _el$;
    })()
  });
};

// 35:23
import { template as _$template } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><span>`);
export default ($0, $1) => {
  const asked = $0()(0);
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    _$insert(_el$2, () => "asked " + asked[0]());
    _$insert(_el$, _$createComponent($1, {
      more: () => {
        asked[1](asked[0]() + 1);
        return asked[0]() < 5;
      }
    }), null);
    return _el$;
  })();
};
