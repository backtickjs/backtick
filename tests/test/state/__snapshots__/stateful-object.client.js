// 10:17
export default $0 => initial => {
  const count = $0()(initial);
  return {
    get: () => count[0](),
    add: n => {
      count[1](count[0]() + n);
    }
  };
};

// 24:5
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<button>`);
export default $0 => {
  const c = $0()(10);
  return (() => {
    var _el$ = _tmpl$();
    _el$.$$click = () => {
      c.add(5);
    };
    _$insert(_el$, () => c.get());
    return _el$;
  })();
};
_$delegateEvents(["click"]);
