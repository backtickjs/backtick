import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type BacktickElement, cs, state } from "@backtickjs/core";
import { fireEvent, render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";

// How a prop lands on the element it was drawn on: as the attribute a page's
// own markup would have written.

const SVG = "http://www.w3.org/2000/svg";
const HTML = "http://www.w3.org/1999/xhtml";

async function drawn(value: BacktickElement): Promise<Element> {
  const { container } = await render(value);
  return container.firstElementChild!;
}

// Every attribute an element holds, by the name it was written under.
function attributes(element: Element): Record<string, string> {
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
      <a href="/counter" id="press">
        go
      </a>,
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
      <div>
        <svg>
          <path />
        </svg>
      </div>,
    );
    const path = root.querySelector("path")!;
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
    const svg = await drawn(<svg viewBox="0 0 279 38" />);
    assert.deepEqual(attributes(svg), { viewBox: "0 0 279 38" });
  });

  // The schema spells these the way SVG does, so a prop, the name on the wire
  // and the string handed to `setAttribute` are one name — nothing here has a
  // table to get from one to another.
  it("writes a hyphenated presentation name straight through", async () => {
    const svg = await drawn(
      <svg>
        <path stroke-width={2} fill-rule="evenodd" />
        <filter color-interpolation-filters="sRGB" />
      </svg>,
    );
    assert.deepEqual(attributes(svg.querySelector("path")!), {
      "stroke-width": "2",
      "fill-rule": "evenodd",
    });
    assert.deepEqual(attributes(svg.querySelector("filter")!), {
      "color-interpolation-filters": "sRGB",
    });
  });

  // And the ones SVG spells camel itself, which lowercasing would lose.
  it("leaves an attribute SVG spells camel alone", async () => {
    const svg = await drawn(
      <svg>
        <linearGradient gradientTransform="rotate(90)" />
        <feTurbulence numOctaves={3} />
      </svg>,
    );
    assert.deepEqual(attributes(svg.children[0]!), {
      gradientTransform: "rotate(90)",
    });
    assert.deepEqual(attributes(svg.children[1]!), { numOctaves: "3" });
  });

  it("is still folded down in HTML", async () => {
    // @ts-expect-error: the schema declares no `tabIndex` on a `div`
    const div = await drawn(<div tabIndex={2} />);
    assert.deepEqual(attributes(div), { tabindex: "2" });
  });
});

describe("a field's value", () => {
  // Once a field is edited, its `value` and `checked` attributes are only its
  // defaults, so a write that reaches the attribute changes nothing shown.
  async function Field() {
    return cs.lift((() => {
    const __cs_text = cs.splice((state) satisfies typeof cs.Spliceable)("first");
    const __cs_isOn = cs.splice((state) satisfies typeof cs.Spliceable)(false);
    return <div>{cs.lift(<input aria-label={cs.lift("text")} value={cs.lift(__cs_text.get())}/>)}{cs.lift(<input type={cs.lift("checkbox")} aria-label={cs.lift("on")} checked={cs.lift(__cs_isOn.get())}/>)}{cs.lift(<button onclick={cs.lift(() => {
        __cs_text.set("second");
        __cs_isOn.set(true);
    })}>
            write
          </button>)}</div>;
})());
  }

  it("follows a write after the field was edited", async () => {
    await render(<Field />);
    const text = screen.getByLabelText<HTMLInputElement>("text");
    const on = screen.getByLabelText<HTMLInputElement>("on");
    fireEvent.input(text, { target: { value: "typed" } });
    await userEvent.click(on);
    await userEvent.click(on);

    await userEvent.click(screen.getByRole("button", { name: "write" }));
    assert.equal(text.value, "second");
    assert.equal(on.checked, true);
  });

  // A read past the end types as the element and reads as `undefined`, so
  // nothing reaches a field without a cast.
  async function Clearable() {
    return cs.lift((() => {
    const __cs_texts = cs.splice((state) satisfies typeof cs.Spliceable)(["typed by the script"]);
    const __cs_flags = cs.splice((state) satisfies typeof cs.Spliceable)([true]);
    return <div>{cs.lift(<input aria-label={cs.lift("text")} value={cs.lift(__cs_texts.get()[0])}/>)}{cs.lift(<input type={cs.lift("checkbox")} aria-label={cs.lift("on")} checked={cs.lift(__cs_flags.get()[0])}/>)}{cs.lift(<button onclick={cs.lift(() => {
        __cs_texts.set([]);
        __cs_flags.set([]);
    })}>
            clear
          </button>)}</div>;
})());
  }

  it("is cleared by nothing, after the field was edited", async () => {
    await render(<Clearable />);
    const text = screen.getByLabelText<HTMLInputElement>("text");
    const on = screen.getByLabelText<HTMLInputElement>("on");
    fireEvent.input(text, { target: { value: "typed" } });
    await userEvent.click(on);
    await userEvent.click(on);

    await userEvent.click(screen.getByRole("button", { name: "clear" }));
    assert.equal(text.value, "");
    assert.equal(on.checked, false);
  });
});
