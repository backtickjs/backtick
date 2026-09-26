// 28:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>add</button><p>`);
export default ($0, $1, $2) => {
  const n = $0()(1);
  const size = $1()(() => ({
    isBig: n[0]() > 2,
    n: n[0]()
  }), undefined, {
    equals: (previous, next) => previous.isBig === next.isBig
  });
  const label = () => {
    $2().console.log();
    return size().isBig ? "big" : "small";
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

// 60:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>same</button><p>`);
export default ($0, $1) => {
  const point = $0()({
    x: 1
  }, {
    equals: (previous, next) => previous.x === next.x
  });
  const label = () => {
    $1().console.log();
    return "x " + point[0]().x;
  };
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    _el$2.$$click = () => point[1]({
      x: point[0]().x
    });
    _$insert(_el$3, label);
    return _el$;
  })();
};
_$delegateEvents(["click"]);

// 85:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<button>`);
export default ($0, $1) => {
  const n = $0()(1, {
    equals: (previous, next) => {
      $1().console.log(previous, next);
      return previous === next;
    }
  });
  return (() => {
    var _el$ = _tmpl$();
    _el$.$$click = () => n[1](2);
    _$insert(_el$, () => "n " + n[0]());
    return _el$;
  })();
};
_$delegateEvents(["click"]);

// 102:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>same</button><p>`);
export default ($0, $1) => {
  const n = $0()(1);
  const label = () => {
    $1().console.log();
    return "n " + n[0]();
  };
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    _el$2.$$click = () => n[1](1);
    _$insert(_el$3, label);
    return _el$;
  })();
};
_$delegateEvents(["click"]);

// 122:7
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
var _tmpl$ = /*#__PURE__*/_$template(`<div><button>same</button><p>`);
export default ($0, $1) => {
  const point = $0()({
    x: 1
  });
  const label = () => {
    $1().console.log();
    return "x " + point[0]().x;
  };
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    _el$2.$$click = () => point[1]({
      x: point[0]().x
    });
    _$insert(_el$3, label);
    return _el$;
  })();
};
_$delegateEvents(["click"]);
