// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the old tagged forms.
export default <button data={{ "#call": "#f0" }} />;
