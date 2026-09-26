// 5:16
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<b>`);
export default $0 => {
  const Badge = p => (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, () => "n " + p.n);
    return _el$;
  })();
  return $0();
};

// 7:12
export default $0 => {
  const Badge = 5;
  return $0(Badge);
};

// 10:14
import { createComponent as _$createComponent } from "solid-js/web";
export default $0 => _$createComponent($0, {
  n: 1
});
