import { cs } from "@backtickjs/core";

export const multiLine = cs`<$View style={{ padding: 24 }}><$Text>Hi {$name}</$Text><$Text>A second line long enough to break</$Text></$View>`;
export const alreadyWrapped = cs`(<$View style={{ padding: 24 }}><$Text>Hi {$name}</$Text><$Text>A second line long enough to break</$Text></$View>)`;
export const oneLine = cs`<$Text>Hi</$Text>`;
export const oneLineWrapped = cs`(<$Text>Hi</$Text>)`;
export const longText = cs`<$Text>A single text element whose content runs well past the print width</$Text>`;
export const fragment = cs`<><$Text>First of two lines that is long</$Text><$Text>Second of two lines</$Text></>`;
export const arrow = cs`(props) => <$View><$Text>{props.a}</$Text><$Text>Some longer text to force a break</$Text></$View>`;
