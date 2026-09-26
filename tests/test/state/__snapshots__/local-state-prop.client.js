// 17:12
export default $0 => "font-size: " + $0()[0]() + "px";

// 18:14
export default $0 => () => {
  $0()[1]($0()[0]() + 1);
};

// 27:10
import { template as _$template } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div>`);
export default ($0, $1) => {
  const size = $0()(16);
  return (() => {
    var _el$ = _tmpl$();
    _$insert(_el$, _$createComponent($1, {
      size: size
    }), null);
    _$insert(_el$, _$createComponent($1, {
      size: size
    }), null);
    return _el$;
  })();
};
