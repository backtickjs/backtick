import { cs } from "@backtickjs/core";

export default cs`({ list: ${[1, "two", true, null]}, obj: ${{ k: 3 }} })`;
