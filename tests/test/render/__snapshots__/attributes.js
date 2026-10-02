import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, fireEvent, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
// How a prop lands on the element it was drawn on: as the attribute a page's
// own markup would have written.
const SVG = "http://www.w3.org/2000/svg";
const HTML = "http://www.w3.org/1999/xhtml";
async function drawn(value) {
  const { container } = render(await evaluate(() => value));
  return container.firstElementChild;
}
// Every attribute an element holds, by the name it was written under.
function attributes(element) {
  return Object.fromEntries(
    [...element.attributes].map((attribute) => [
      attribute.name,
      attribute.value,
    ]),
  );
}
describe("a prop", () => {
  it("is written as an attribute", async () => {
    const link = await drawn(
      cs.create(
        "3bxd5p1c8e0pp:32:29",
        { params: [] },
        '() => <a href="/counter" id="press">\n      go\n    </a>',
        '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["render/attributes.test.tsx"],"names":[],"mappings":"AA+BgC,MAAA,CAAC,CAAC,CAAC,IAAI,CAAC,UAAU,CAAC,EAAE,CAAC,OAAO,CACvD;;IACF,EAAE,CAAC,CAAC"}',
      ),
    );
    assert.deepEqual(attributes(link), { href: "/counter", id: "press" });
  });
});
describe("an svg tag", () => {
  // `document.createElement("path")` is an `HTMLUnknownElement`: it parses, it
  // inserts, and it draws nothing. The prefix, which the runtime adds to a
  // tag drawn inside an `svg`, is what says which namespace it is from.
  it("is made in the SVG namespace, without its prefix", async () => {
    const root = await drawn(
      cs.create(
        "3bxd5p1c8e0pp:44:29",
        { params: [] },
        "() => <div>\n      <svg>\n        <path />\n      </svg>\n    </div>",
        '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["render/attributes.test.tsx"],"names":[],"mappings":"AA2CgC,MAAA,CAAC,GAAG,CAC9B;MAAA,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,AAAD,EACP;MAAA,EAAE,GAAG,CACP;IAAA,EAAE,GAAG,CAAC"}',
      ),
    );
    const path = root.querySelector("path");
    assert.equal(path.namespaceURI, SVG);
    assert.equal(path.localName, "path");
    assert.equal(root.namespaceURI, HTML);
  });
});
describe("an attribute's case", () => {
  // HTML's attribute names are case-insensitive and SVG's are not, so one rule
  // cannot serve both: lowercasing is what makes a prop and an attribute the
  // same name in HTML, and what loses `viewBox` in SVG.
  it("is kept in the SVG namespace", async () => {
    const svg = await drawn(
      cs.create(
        "3bxd5p1c8e0pp:61:28",
        { params: [] },
        '() => <svg viewBox="0 0 279 38"/>',
        '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["render/attributes.test.tsx"],"names":[],"mappings":"AA4D+B,MAAA,CAAC,GAAG,CAAC,OAAO,CAAC,YAAY,EAAG"}',
      ),
    );
    assert.deepEqual(attributes(svg), { viewBox: "0 0 279 38" });
  });
  // The schema spells these the way SVG does, so a prop, the name on the wire
  // and the string handed to `setAttribute` are one name — nothing here has a
  // table to get from one to another.
  it("writes a hyphenated presentation name straight through", async () => {
    const svg = await drawn(
      cs.create(
        "3bxd5p1c8e0pp:69:28",
        { params: [] },
        '() => <svg>\n      <path stroke-width={2} fill-rule="evenodd"/>\n      <filter color-interpolation-filters="sRGB"/>\n    </svg>',
        '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["render/attributes.test.tsx"],"names":[],"mappings":"AAoE+B,MAAA,CAAC,GAAG,CAC7B;MAAA,CAAC,IAAI,CAAC,YAAY,CAAC,CAAC,CAAC,CAAC,CAAC,SAAS,CAAC,SAAS,EAC1C;MAAA,CAAC,MAAM,CAAC,2BAA2B,CAAC,MAAM,EAC5C;IAAA,EAAE,GAAG,CAAC"}',
      ),
    );
    assert.deepEqual(attributes(svg.querySelector("path")), {
      "stroke-width": "2",
      "fill-rule": "evenodd",
    });
    assert.deepEqual(attributes(svg.querySelector("filter")), {
      "color-interpolation-filters": "sRGB",
    });
  });
  // And the ones SVG spells camel itself, which lowercasing would lose.
  it("leaves an attribute SVG spells camel alone", async () => {
    const svg = await drawn(
      cs.create(
        "3bxd5p1c8e0pp:84:28",
        { params: [] },
        '() => <svg>\n      <linearGradient gradientTransform="rotate(90)"/>\n      <feTurbulence numOctaves={3}/>\n    </svg>',
        '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["render/attributes.test.tsx"],"names":[],"mappings":"AAmF+B,MAAA,CAAC,GAAG,CAC7B;MAAA,CAAC,cAAc,CAAC,iBAAiB,CAAC,YAAY,EAC9C;MAAA,CAAC,YAAY,CAAC,UAAU,CAAC,CAAC,CAAC,CAAC,EAC9B;IAAA,EAAE,GAAG,CAAC"}',
      ),
    );
    assert.deepEqual(attributes(svg.children[0]), {
      gradientTransform: "rotate(90)",
    });
    assert.deepEqual(attributes(svg.children[1]), { numOctaves: "3" });
  });
  it("is still folded down in HTML", async () => {
    const div = await drawn(
      cs.create(
        "3bxd5p1c8e0pp:95:28",
        { params: [] },
        "() => <div tabIndex={2}/>",
        '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["render/attributes.test.tsx"],"names":[],"mappings":"AA8F+B,MAAA,CAAC,GAAG,CAAC,QAAQ,CAAC,CAAC,CAAC,CAAC,EAAG"}',
      ),
    );
    assert.deepEqual(attributes(div), { tabindex: "2" });
  });
});
describe("a field's value", () => {
  // Once a field is edited, its `value` and `checked` attributes are only its
  // defaults, so a write that reaches the attribute changes nothing shown.
  async function Field() {
    return cs.create(
      "3bxd5p1c8e0pp:104:11",
      { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
      '($splice0) => {\n    const text = $splice0()("first");\n    const isOn = $splice0()(false);\n    return (<div>\n          <input aria-label="text" value={text[0]()}/>\n          <input type="checkbox" aria-label="on" checked={isOn[0]()}/>\n          <button onclick={() => {\n            text[1]("second");\n            isOn[1](true);\n        }}>\n            write\n          </button>\n        </div>);\n}',
      '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["render/attributes.test.tsx"],"names":[],"mappings":"AAuGc;IACR,MAAM,IAAI,GAAG,UAAa,CAAC,OAAO,CAAC,CAAC;IACpC,MAAM,IAAI,GAAG,UAAa,CAAC,KAAK,CAAC,CAAC;IAClC,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,EAC1C;UAAA,CAAC,KAAK,CAAC,IAAI,CAAC,UAAU,CAAC,UAAU,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,EAC1D;UAAA,CAAC,MAAM,CACL,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,IAAI,CAAC,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC;YAClB,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;QAChB,CAAC,CAAC,CAEF;;UACF,EAAE,MAAM,CACV;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    );
  }
  it("follows a write after the field was edited", async () => {
    render(await evaluate(() => _jsx(Field, {})));
    const text = screen.getByLabelText("text");
    const on = screen.getByLabelText("on");
    fireEvent.input(text, { target: { value: "typed" } });
    await userEvent.click(on);
    await userEvent.click(on);
    await userEvent.click(screen.getByRole("button", { name: "write" }));
    assert.equal(text.value, "second");
    assert.equal(on.checked, true);
  });
});
