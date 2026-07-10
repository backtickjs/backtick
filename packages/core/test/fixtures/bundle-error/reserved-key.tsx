// `#` is the bundle's one reserved key — the discriminant of every structured
// form — so a plain data object can't carry it.
export default <button data={{ "#": "value" }} />;
