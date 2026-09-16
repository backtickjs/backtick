import { cs, For } from "@backtickjs/core";

// SVG written the way it is pasted: no tag says which language it is from.
// Where an element is drawn does — inside an `svg` it is SVG's, and a
// `foreignObject` holds HTML again — so a circle a host component or a function
// the script holds draws is SVG's once it stands inside the `svg`, and a
// `title` or an `a`, whose names both languages use, is whichever one encloses
// it.
async function Ring() {
  return cs.lift(cs.const(<circle cx={cs.lift("5")} cy={cs.lift("5")} r={cs.lift("4")} fill={cs.lift("none")} stroke={cs.lift("currentColor")}/>));
}

const svgNamespace = cs.lift((() => {
    const __cs_Dot = cs.const((__cs_props: {
        x: number;
    }) => <circle cx={cs.lift(cs.receiver(__cs_props).x)} cy={cs.lift("5")} r={cs.lift("2")}>{cs.lift(<title>{cs.lift("dot " + cs.receiver(__cs_props).x)}</title>)}</circle>);
    return cs.const(<div>{cs.lift(<a href={cs.lift("/shapes")}>{cs.lift("shapes")}</a>)}{cs.lift(<svg viewBox={cs.lift("0 0 30 10")} width={cs.lift("120")}>{cs.lift(<Ring />)}{cs.lift(<For each={cs.lift([10, 20])}>{cs.lift((__cs_x: number) => <__cs_Dot x={__cs_x}/>)}</For>)}{cs.lift(<foreignObject x={cs.lift("0")} y={cs.lift("0")} width={cs.lift("10")} height={cs.lift("10")}>{cs.lift(<p>{cs.lift("html again")}</p>)}</foreignObject>)}</svg>)}</div>);
})());
