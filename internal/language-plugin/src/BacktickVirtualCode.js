import { virtualize } from "@backtickjs-internal/compiler";
export class BacktickVirtualCode {
    id = "backtick-source";
    languageId;
    mappings;
    snapshot;
    embeddedCodes;
    diagnostics;
    constructor(ts, fileName, languageId, snapshot) {
        const sourceText = snapshot.getText(0, snapshot.getLength());
        const { virtualCode, mappings, diagnostics } = virtualize(ts, fileName, sourceText);
        this.languageId = languageId;
        this.diagnostics = diagnostics;
        this.snapshot = snapshot;
        this.mappings = [
            {
                sourceOffsets: [0],
                generatedOffsets: [0],
                lengths: [sourceText.length],
                data: { format: false, verification: true },
            },
        ];
        this.embeddedCodes = [
            {
                id: "backtick-virtual",
                languageId,
                snapshot: {
                    getText: (start, end) => virtualCode.substring(start, end),
                    getLength: () => virtualCode.length,
                    getChangeRange: () => undefined,
                },
                mappings: mappings.map((mapping) => ({
                    ...mapping,
                    // The compiler's own flags (e.g. `semantic: false` on a
                    // `cs.splice(...)` wrapper, so hover doesn't resolve through it)
                    // override the defaults.
                    data: {
                        completion: true,
                        format: false,
                        navigation: true,
                        semantic: true,
                        structure: true,
                        verification: true,
                        ...mapping.data,
                    },
                })),
            },
        ];
    }
}
//# sourceMappingURL=BacktickVirtualCode.js.map