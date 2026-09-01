import { Type, type Schema } from "@backtickjs/schema";

/**
 * What every client can do, whatever it draws with.
 *
 * A target's schema says what a browser or a phone or a display offers; this
 * says what all of them do, because the language reaches these names in a
 * script and every client has to answer for them. A target extends this rather
 * than repeating it.
 *
 * A name is written whole — `Math.floor`, not a `Math` holding a `floor` —
 * because that is how a script reaches it and how the compiler recognises it.
 */
export const schema: Schema = {
  package: "@backtickjs/language-schema",

  namespace: "Language",

  extends: [],

  types: {
    ReadonlyState: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Ref("ClientHandle")], {
        read: Type.Function([], Type.Ref("T")),
      }),
      {
        description:
          "Storage a script may read but not replace.\n\n" +
          "What a position is in a list is one of these, and so is a cell handed to a component that only displays it: the signature says which way the value travels, and a `State` goes wherever one of these is wanted.",
      },
    ),

    State: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("ReadonlyState"), [Type.Ref("T")])], {
        write: Type.Function(
          [Type.FunctionParameter("value", Type.Ref("T"))],
          Type.Void(),
        ),
        update: Type.Function(
          [
            Type.FunctionParameter(
              "updater",
              Type.Function(
                [Type.FunctionParameter("value", Type.Ref("T"))],
                Type.Ref("T"),
              ),
            ),
          ],
          Type.Void(),
        ),
      }),
      {
        description:
          "A cell as a script reads it.\n\n" +
          "What makes one is not here: `state` is a client function a script imports and splices, so a cell is what calling it answers with. This is the half that reaches the client.",
      },
    ),

    ArrayLike: Type.Generic(
      [Type.GenericParameter("T", Type.Ref("ClientValue"))],
      Type.Interface([], {
        length: Type.Number({ readOnly: true }),
        n: Type.Index("n", Type.Number(), Type.Ref("T"), { readOnly: true }),
      }),
    ),
  },

  // The language draws nothing: what a list or an element accepts is a schema
  // built on this one, and this says only what a script reaches whether
  // anything is drawn or not.
  elements: {},

  /**
   * Every name a script reaches, written whole, with a member of a value
   * keyed as the client answers for it: `string.charAt(self, pos)`.
   *
   * The prefix is written as the thing it stands for is: `string.indexOf` is a
   * member of a string, where `Array.from` is a name of its own. Keeping the
   * two apart is what one namespace is for — a prefix meaning both a kind of
   * value and a place to hang statics is a name that means two things.
   *
   * The receiver is written down because this document is read by clients that
   * have no `this` — a member of a value is a call the value is handed to, and
   * saying so is the schema's job rather than a host's convention. A member
   * holding a value takes nothing: `string.length` is a number, and the prefix
   * already says which value it is read off.
   *
   * Nothing is written under `[]`. An index signature is reached by the
   * operator rather than by a name, and what a client does with it is the
   * language's own rule rather than a member it looks up — so there is no name
   * here and nothing for a client to answer.
   */
  builtins: {
    "boolean.valueOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.Boolean(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.Boolean(),
      { description: "Returns the primitive value of the specified object." },
    ),
    "number.toString": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("radix", Type.Number(), {
            description:
              "Specifies a radix for converting numeric values to strings. This value is only used for numbers.",
          }),
        ),
      ],
      Type.String(),
      { description: "Returns a string representation of an object." },
    ),
    "number.toFixed": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("fractionDigits", Type.Number(), {
            description:
              "Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string representing a number in fixed-point notation.",
      },
    ),
    "number.toExponential": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("fractionDigits", Type.Number(), {
            description:
              "Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string containing a number represented in exponential notation.",
      },
    ),
    "number.toPrecision": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("precision", Type.Number(), {
            description:
              "Number of significant digits. Must be in the range 1 - 21, inclusive.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.",
      },
    ),
    "number.valueOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.Number(),
      { description: "Returns the primitive value of the specified object." },
    ),
    "string.toString": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      { description: "Returns a string representation of a string." },
    ),
    "string.charAt": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("pos", Type.Number(), {
          description: "The zero-based index of the desired character.",
        }),
      ],
      Type.String(),
      { description: "Returns the character at the specified index." },
    ),
    "string.charCodeAt": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("index", Type.Number(), {
          description:
            "The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the Unicode value of the character at the specified location.",
      },
    ),
    "string.concat": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.Rest(
          Type.FunctionParameter("strings", Type.String(), {
            description: "The strings to append to the end of the string.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string that contains the concatenation of two or more strings.",
      },
    ),
    "string.indexOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("searchString", Type.String(), {
          description: "The substring to search for in the string",
        }),
        Type.Optional(
          Type.FunctionParameter("position", Type.Number(), {
            description:
              "The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the position of the first occurrence of a substring, or -1 if it is not present.",
      },
    ),
    "string.lastIndexOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("searchString", Type.String(), {
          description: "The substring to search for.",
        }),
        Type.Optional(
          Type.FunctionParameter("position", Type.Number(), {
            description:
              "The index at which to begin searching. If omitted, the search begins at the end of the string.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the last occurrence of a substring in the string, or -1 if it is not present.",
      },
    ),
    "string.localeCompare": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("that", Type.String(), {
          description: "String to compare to target string",
        }),
      ],
      Type.Number(),
      {
        description:
          "Determines whether two strings are equivalent in the current locale.",
      },
    ),
    "string.replace": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("searchValue", Type.String(), {
          description: "A string to search for.",
        }),
        Type.FunctionParameter(
          "replaceValue",
          Type.Union([
            Type.String(),
            Type.Function(
              [
                Type.FunctionParameter("substring", Type.String()),
                Type.FunctionParameter("offset", Type.Number()),
                Type.FunctionParameter("string", Type.String()),
              ],
              Type.String(),
            ),
          ]),
          {
            description:
              "The text to replace it with, or a function answering with that text. Only the first match of `searchValue` is replaced.",
          },
        ),
      ],
      Type.String(),
      { description: "Replaces text in a string, using a search string." },
    ),
    "string.slice": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("start", Type.Number(), {
            description:
              "The index to the beginning of the specified portion of stringObj.",
          }),
        ),
        Type.Optional(
          Type.FunctionParameter("end", Type.Number(), {
            description:
              "The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end. If this value is not specified, the substring continues to the end of stringObj.",
          }),
        ),
      ],
      Type.String(),
      { description: "Returns a section of a string." },
    ),
    "string.split": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("separator", Type.String(), {
          description:
            "A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.",
        }),
        Type.Optional(
          Type.FunctionParameter("limit", Type.Number(), {
            description:
              "A value used to limit the number of elements returned in the array.",
          }),
        ),
      ],
      Type.Array(Type.String()),
      {
        description:
          "Split a string into substrings using the specified separator and return them as an array.",
      },
    ),
    "string.substring": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("start", Type.Number(), {
          description:
            "The zero-based index number indicating the beginning of the substring.",
        }),
        Type.Optional(
          Type.FunctionParameter("end", Type.Number(), {
            description:
              "Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end. If end is omitted, the characters from start through the end of the original string are returned.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns the substring at the specified location within a String object.",
      },
    ),
    "string.toLowerCase": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      {
        description:
          "Converts all the alphabetic characters in a string to lowercase.",
      },
    ),
    "string.toLocaleLowerCase": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter(
            "locales",
            Type.Union([Type.String(), Type.Array(Type.String())]),
          ),
        ),
      ],
      Type.String(),
      {
        description:
          "Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.",
      },
    ),
    "string.toUpperCase": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      {
        description:
          "Converts all the alphabetic characters in a string to uppercase.",
      },
    ),
    "string.toLocaleUpperCase": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter(
            "locales",
            Type.Union([Type.String(), Type.Array(Type.String())]),
          ),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.",
      },
    ),
    "string.trim": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      {
        description:
          "Removes the leading and trailing white space and line terminator characters from a string.",
      },
    ),
    "string.length": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.Number(),
      {
        getter: true,
        description: "Returns the length of a String object.",
      },
    ),
    "string.valueOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      { description: "Returns the primitive value of the specified object." },
    ),
    "array.length": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
        ],
        Type.Number(),
        { getter: true },
      ),
      {
        description:
          "Gets the length of the array. This is a number one higher than the highest index in the array.",
      },
    ),
    "array.concat": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.Rest(
            Type.FunctionParameter(
              "items",
              Type.Union([
                Type.Ref("T"),
                Type.Array(Type.Ref("T"), { readOnly: true }),
              ]),
              {
                description:
                  "Additional arrays and/or items to add to the end of the array.",
              },
            ),
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Combines two or more arrays. This method returns a new array without modifying any existing arrays.",
      },
    ),
    "array.join": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.Optional(
            Type.FunctionParameter("separator", Type.String(), {
              description:
                "A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.",
            }),
          ),
        ],
        Type.String(),
      ),
      {
        description:
          "Adds all the elements of an array into a string, separated by the specified separator string.",
      },
    ),
    "array.slice": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.Optional(
            Type.FunctionParameter("start", Type.Number(), {
              description:
                "The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0.",
            }),
          ),
          Type.Optional(
            Type.FunctionParameter("end", Type.Number(), {
              description:
                "The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.",
            }),
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      { description: "Returns a copy of a section of an array." },
    ),
    "array.indexOf": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter("searchElement", Type.Ref("T"), {
            description: "The value to locate in the array.",
          }),
          Type.Optional(
            Type.FunctionParameter("fromIndex", Type.Number(), {
              description:
                "The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.",
            }),
          ),
        ],
        Type.Number(),
      ),
      {
        description:
          "Returns the index of the first occurrence of a value in an array, or -1 if it is not present.",
      },
    ),
    "array.includes": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter("searchElement", Type.Ref("T"), {
            description: "The element to search for.",
          }),
          Type.Optional(
            Type.FunctionParameter("fromIndex", Type.Number(), {
              description:
                "The position in this array at which to begin searching for searchElement.",
            }),
          ),
        ],
        Type.Boolean(),
      ),
      {
        description:
          "Determines whether an array includes a certain element, returning true or false as appropriate.",
      },
    ),
    "array.map": Type.Generic(
      [Type.GenericParameter("T"), Type.GenericParameter("U")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter(
            "callbackfn",
            Type.Function(
              [
                Type.FunctionParameter("value", Type.Ref("T")),
                Type.FunctionParameter("index", Type.Number()),
              ],
              Type.Ref("U"),
            ),
            {
              description:
                "A function that accepts up to two arguments. The map method calls the callbackfn function one time for each element in the array.",
            },
          ),
        ],
        Type.Array(Type.Ref("U")),
      ),
      {
        description:
          "Calls a defined callback function on each element of an array, and returns an array that contains the results.",
      },
    ),
    "array.reduce": Type.Generic(
      [Type.GenericParameter("T"), Type.GenericParameter("U")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter(
            "callbackfn",
            Type.Function(
              [
                Type.FunctionParameter("previousValue", Type.Ref("U")),
                Type.FunctionParameter("currentValue", Type.Ref("T")),
                Type.FunctionParameter("currentIndex", Type.Number()),
              ],
              Type.Ref("U"),
            ),
            {
              description:
                "A function that accepts up to three arguments. The reduce method calls the callbackfn function one time for each element in the array.",
            },
          ),
          Type.FunctionParameter("initialValue", Type.Ref("U"), {
            description:
              "It is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.",
          }),
        ],
        Type.Ref("U"),
      ),
      {
        description:
          "Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.\n\nThe initial value is required, where the standard library makes it optional: without one the first call is handed an element rather than an accumulator, and an empty array has nothing to hand it and throws. Both are rules a host would have to reproduce exactly to agree, and naming the starting value is the same work.",
      },
    ),
    "array.filter": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter(
            "predicate",
            Type.Function(
              [
                Type.FunctionParameter("value", Type.Ref("T")),
                Type.FunctionParameter("index", Type.Number()),
              ],
              Type.Boolean(),
            ),
            {
              description:
                "A function that accepts up to two arguments. The filter method calls the predicate function one time for each element in the array.",
            },
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Returns the elements of an array that meet the condition specified in a callback function.",
      },
    ),
    "array.with": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter("index", Type.Number(), {
            description:
              "The index of the value to overwrite. If the index is negative, then it replaces from the end of the array.",
          }),
          Type.FunctionParameter("value", Type.Ref("T"), {
            description: "The value to write into the copied array.",
          }),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Copies an array, then overwrites the value at the provided index with the\ngiven value. If the index is negative, then it replaces from the end\nof the array.",
      },
    ),
    "array.toSorted": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter(
            "compareFn",
            Type.Function(
              [
                Type.FunctionParameter("a", Type.Ref("T")),
                Type.FunctionParameter("b", Type.Ref("T")),
              ],
              Type.Number(),
            ),
            {
              description:
                "Function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise.",
            },
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Returns a copy of an array with its elements sorted.\n\nThe comparator is required, where the standard library makes it optional:\nsorting without one compares the elements as strings, which is a rule of\nJavaScript's rather than of this language, and every other host would have\nto reproduce it to agree. Saying how to order two elements is the same\nwork and it ports.",
      },
    ),
    "array.toReversed": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Returns a copy of an array with its elements in reverse order.",
      },
    ),
    "array.toSpliced": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter("start", Type.Number(), {
            description:
              "The zero-based location in the array from which to start removing elements.",
          }),
          Type.FunctionParameter("deleteCount", Type.Number(), {
            description: "The number of elements to remove.",
          }),
          Type.Rest(
            Type.FunctionParameter("items", Type.Ref("T"), {
              description:
                "Elements to insert into the copied array in place of the deleted elements.",
            }),
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Copies an array and removes elements while, if necessary, inserting new elements in their place, returning the remaining elements.",
      },
    ),
    "JSON.parse": Type.Function(
      [
        Type.FunctionParameter("text", Type.String(), {
          description: "A valid JSON string.",
        }),
      ],
      Type.Ref("ClientValue"),
      {
        description:
          "Converts a JSON string into the value it describes. Throws if the" +
          " text is not JSON.",
      },
    ),
    "JSON.stringify": Type.Function(
      [
        Type.FunctionParameter("value", Type.Ref("ClientValue"), {
          description: "A value to convert.",
        }),
      ],
      Type.String(),
      {
        description: "Converts a value to the JSON string that describes it.",
      },
    ),
    "Math.E": Type.Number({
      description:
        "The mathematical constant e. This is Euler's number, the base of natural logarithms.",
    }),
    "Math.LN10": Type.Number({
      description: "The natural logarithm of 10.",
    }),
    "Math.LN2": Type.Number({
      description: "The natural logarithm of 2.",
    }),
    "Math.LOG2E": Type.Number({
      description: "The base-2 logarithm of e.",
    }),
    "Math.LOG10E": Type.Number({
      description: "The base-10 logarithm of e.",
    }),
    "Math.PI": Type.Number({
      description:
        "Pi. This is the ratio of the circumference of a circle to its diameter.",
    }),
    "Math.SQRT1_2": Type.Number({
      description:
        "The square root of 0.5, or, equivalently, one divided by the square root of 2.",
    }),
    "Math.SQRT2": Type.Number({
      description: "The square root of 2.",
    }),
    "Math.abs": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression for which the absolute value is needed.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the absolute value of a number (the value without regard to whether it is positive or negative).\nFor example, the absolute value of -5 is the same as the absolute value of 5.",
      },
    ),
    "Math.acos": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description: "Returns the arc cosine (or inverse cosine) of a number.",
      },
    ),
    "Math.asin": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the arcsine of a number." },
    ),
    "Math.atan": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression for which the arctangent is needed.",
        }),
      ],
      Type.Number(),
      { description: "Returns the arctangent of a number." },
    ),
    "Math.atan2": Type.Function(
      [
        Type.FunctionParameter("y", Type.Number(), {
          description:
            "A numeric expression representing the cartesian y-coordinate.",
        }),
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression representing the cartesian x-coordinate.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the angle (in radians) between the X axis and the line going through both the origin and the given point.",
      },
    ),
    "Math.ceil": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the smallest integer greater than or equal to its numeric argument.",
      },
    ),
    "Math.cos": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the cosine of a number." },
    ),
    "Math.exp": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression representing the power of e.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns e (the base of natural logarithms) raised to a power.",
      },
    ),
    "Math.floor": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the greatest integer less than or equal to its numeric argument.",
      },
    ),
    "Math.log": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description: "Returns the natural logarithm (base e) of a number.",
      },
    ),
    "Math.max": Type.Function(
      [
        Type.Rest(
          Type.FunctionParameter("values", Type.Number(), {
            description: "Numeric expressions to be evaluated.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the larger of a set of supplied numeric expressions.\n\nCalling this with no arguments is a client error rather than an answer: the standard library takes none and answers `-Infinity`, which is not a value this language has.",
      },
    ),
    "Math.min": Type.Function(
      [
        Type.Rest(
          Type.FunctionParameter("values", Type.Number(), {
            description: "Numeric expressions to be evaluated.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the smaller of a set of supplied numeric expressions.\n\nCalling this with no arguments is a client error rather than an answer: the standard library takes none and answers `Infinity`, which is not a value this language has.",
      },
    ),
    "Math.pow": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "The base value of the expression.",
        }),
        Type.FunctionParameter("y", Type.Number(), {
          description: "The exponent value of the expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the value of a base expression taken to a specified power.",
      },
    ),
    "Math.random": Type.Function([], Type.Number(), {
      description: "Returns a pseudorandom number between 0 and 1.",
    }),
    "Math.round": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "The value to be rounded to the nearest integer.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns a supplied numeric expression rounded to the nearest integer.",
      },
    ),
    "Math.sin": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the sine of a number." },
    ),
    "Math.sqrt": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the square root of a number." },
    ),
    "Math.tan": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the tangent of a number." },
    ),
    "Math.clz32": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the number of leading zero bits in the 32-bit binary representation of a number.",
      },
    ),
    "Math.imul": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "First number",
        }),
        Type.FunctionParameter("y", Type.Number(), {
          description: "Second number",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the result of 32-bit multiplication of two numbers.",
      },
    ),
    "Math.sign": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "The numeric expression to test",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the sign of the x, indicating whether x is positive, negative or zero.",
      },
    ),
    "Math.log10": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the base 10 logarithm of a number." },
    ),
    "Math.log2": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the base 2 logarithm of a number." },
    ),
    "Math.log1p": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the natural logarithm of 1 + x." },
    ),
    "Math.expm1": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the result of (e^x - 1), which is an implementation-dependent approximation to\nsubtracting 1 from the exponential function of x (e raised to the power of x, where e\nis the base of the natural logarithms).",
      },
    ),
    "Math.cosh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the hyperbolic cosine of a number." },
    ),
    "Math.sinh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the hyperbolic sine of a number." },
    ),
    "Math.tanh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the hyperbolic tangent of a number." },
    ),
    "Math.acosh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the inverse hyperbolic cosine of a number." },
    ),
    "Math.asinh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the inverse hyperbolic sine of a number." },
    ),
    "Math.atanh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      {
        description: "Returns the inverse hyperbolic tangent of a number.",
      },
    ),
    "Math.hypot": Type.Function(
      [
        Type.Rest(
          Type.FunctionParameter("values", Type.Number(), {
            description:
              "Values to compute the square root for. If no arguments are passed, the result is +0. If there is only one argument, the result is the absolute value. If any argument is +Infinity or -Infinity, the result is +Infinity. If any argument is NaN, the result is NaN. If all arguments are either +0 or −0, the result is +0.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the square root of the sum of squares of its arguments.",
      },
    ),
    "Math.trunc": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the integral part of the numeric expression x, removing any fractional digits.\nIf x is already an integer, the result is x.",
      },
    ),
    "Math.fround": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the nearest single precision float representation of a number.",
      },
    ),
    "Math.cbrt": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns an implementation-dependent approximation to the cube root of number.",
      },
    ),
    "Array.from": Type.Generic(
      [
        Type.GenericParameter("T", Type.Ref("ClientValue")),
        Type.GenericParameter("U", Type.Ref("ClientValue")),
      ],
      Type.Function(
        [
          Type.FunctionParameter(
            "arrayLike",
            Type.Apply(Type.Ref("ArrayLike"), [Type.Ref("T")]),
            {
              description: "An array-like object to convert to an array.",
            },
          ),
          Type.FunctionParameter(
            "mapfn",
            Type.Function(
              [
                Type.FunctionParameter("v", Type.Ref("T")),
                Type.FunctionParameter("k", Type.Number()),
              ],
              Type.Ref("U"),
            ),
            {
              description:
                "A mapping function to call on every element of the array.",
            },
          ),
        ],
        Type.Array(Type.Ref("U")),
      ),
      {
        description:
          "Creates an array from an array-like object.\n\n" +
          "The mapper is required, where the standard library makes it optional: without one, a source that names only a length answers with holes, and a hole reads as `undefined` \u2014 which this language has no value for.",
      },
    ),
    "Array.of": Type.Generic(
      [Type.GenericParameter("T", Type.Ref("ClientValue"))],
      Type.Function(
        [
          Type.Rest(
            Type.FunctionParameter("items", Type.Ref("T"), {
              description:
                "A set of elements to include in the new array object.",
            }),
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description: "Returns a new array from a set of elements.",
      },
    ),
    "Number.EPSILON": Type.Number({
      description:
        "The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1 that is representable as a Number value, which is approximately: 2.2204460492503130808472633361816 x 10−16.",
    }),
    "Number.isFinite": Type.Function(
      [
        Type.FunctionParameter("number", Type.Ref("ClientValue"), {
          description: "A numeric value.",
        }),
      ],
      Type.Boolean(),
      {
        description:
          "Returns true if passed value is finite. Unlike the global isFinite, Number.isFinite doesn't forcibly convert the parameter to a number. Only finite values of the type number, result in true.",
      },
    ),
    "Number.isInteger": Type.Function(
      [
        Type.FunctionParameter("number", Type.Ref("ClientValue"), {
          description: "A numeric value.",
        }),
      ],
      Type.Boolean(),
      {
        description:
          "Returns true if the value passed is an integer, false otherwise.",
      },
    ),
    "Number.parseFloat": Type.Function(
      [
        Type.FunctionParameter("string", Type.String(), {
          description: "A string that contains a floating-point number.",
        }),
      ],
      Type.Number(),
      { description: "Converts a string to a floating-point number." },
    ),
    "Number.parseInt": Type.Function(
      [
        Type.FunctionParameter("string", Type.String(), {
          description: "A string to convert into a number.",
        }),
        Type.Optional(
          Type.FunctionParameter("radix", Type.Number(), {
            description:
              "A value between 2 and 36 that specifies the base of the number in `string`. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal.",
          }),
        ),
      ],
      Type.Number(),
      { description: "Converts A string to an integer." },
    ),
    "String.fromCodePoint": Type.Function(
      [Type.Rest(Type.FunctionParameter("codePoints", Type.Number()))],
      Type.String(),
      {
        description:
          "Return the String value whose elements are, in order, the elements in the List elements. If length is 0, the empty string is returned.",
      },
    ),
    state: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [Type.FunctionParameter("initial", Type.Ref("T"))],
        Type.Apply(Type.Ref("State"), [Type.Ref("T")]),
      ),
    ),
    setTimeout: Type.Function(
      [
        Type.FunctionParameter("handler", Type.Function([], Type.Void()), {
          description: "What to run once the delay has passed.",
        }),
        Type.Optional(
          Type.FunctionParameter("timeout", Type.Number(), {
            description:
              "How long to wait, in milliseconds. Left out is the same as zero: the soonest turn that is not this one.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Runs something once, later, and answers with a number to cancel it by.\n\n" +
          "Nothing cancels it for you. A timer outlives the drawing that made one, so a script that may go away first keeps its id and clears it.",
      },
    ),
    clearTimeout: Type.Function(
      [
        Type.FunctionParameter("id", Type.Number(), {
          description: "What `setTimeout` answered with.",
        }),
      ],
      Type.Void(),
      {
        description:
          "Cancels a timer that has not run yet. An id that has already run, or was never one, is not an error.",
      },
    ),
    setInterval: Type.Function(
      [
        Type.FunctionParameter("handler", Type.Function([], Type.Void()), {
          description: "What to run on every tick.",
        }),
        Type.Optional(
          Type.FunctionParameter("timeout", Type.Number(), {
            description: "How long between ticks, in milliseconds.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Runs something over and over, and answers with a number to cancel it by.\n\n" +
          "This is what makes a loop, and not `setTimeout` calling itself: a variable cannot be named in its own initializer, so a handler that reschedules itself is not something a script can write.",
      },
    ),
    clearInterval: Type.Function(
      [
        Type.FunctionParameter("id", Type.Number(), {
          description: "What `setInterval` answered with.",
        }),
      ],
      Type.Void(),
      {
        description:
          "Stops a repeating timer. Ids are one series whichever call made them, so either `clear` cancels either kind.",
      },
    ),
  },
};
