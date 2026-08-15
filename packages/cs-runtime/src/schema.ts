import { Type, type ClientSchema } from "@backtickjs/schema";

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
export const schema: ClientSchema = {
  extends: [],

  types: {
    Math: Type.Class({
      E: Type.Number({
        description:
          "The mathematical constant e. This is Euler's number, the base of natural logarithms.",
      }),
      LN10: Type.Number({
        description: "The natural logarithm of 10.",
      }),
      LN2: Type.Number({
        description: "The natural logarithm of 2.",
      }),
      LOG2E: Type.Number({
        description: "The base-2 logarithm of e.",
      }),
      LOG10E: Type.Number({
        description: "The base-10 logarithm of e.",
      }),
      PI: Type.Number({
        description:
          "Pi. This is the ratio of the circumference of a circle to its diameter.",
      }),
      SQRT1_2: Type.Number({
        description:
          "The square root of 0.5, or, equivalently, one divided by the square root of 2.",
      }),
      SQRT2: Type.Number({
        description: "The square root of 2.",
      }),
      abs: Type.Function(
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
      acos: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        {
          description:
            "Returns the arc cosine (or inverse cosine) of a number.",
        },
      ),
      asin: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the arcsine of a number." },
      ),
      atan: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression for which the arctangent is needed.",
          }),
        ],
        Type.Number(),
        { description: "Returns the arctangent of a number." },
      ),
      atan2: Type.Function(
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
      ceil: Type.Function(
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
      cos: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the cosine of a number." },
      ),
      exp: Type.Function(
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
      floor: Type.Function(
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
      log: Type.Function(
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
      max: Type.Function(
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
      min: Type.Function(
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
      pow: Type.Function(
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
      random: Type.Function([], Type.Number(), {
        description: "Returns a pseudorandom number between 0 and 1.",
      }),
      round: Type.Function(
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
      sin: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the sine of a number." },
      ),
      sqrt: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the square root of a number." },
      ),
      tan: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the tangent of a number." },
      ),
      clz32: Type.Function(
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
      imul: Type.Function(
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
      sign: Type.Function(
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
      log10: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the base 10 logarithm of a number." },
      ),
      log2: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the base 2 logarithm of a number." },
      ),
      log1p: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the natural logarithm of 1 + x." },
      ),
      expm1: Type.Function(
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
      cosh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the hyperbolic cosine of a number." },
      ),
      sinh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the hyperbolic sine of a number." },
      ),
      tanh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the hyperbolic tangent of a number." },
      ),
      acosh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the inverse hyperbolic cosine of a number." },
      ),
      asinh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the inverse hyperbolic sine of a number." },
      ),
      atanh: Type.Function(
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
      hypot: Type.Function(
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
      trunc: Type.Function(
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
      fround: Type.Function(
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
      cbrt: Type.Function(
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
    }),
    Value: Type.Union(
      [
        Type.Null(),
        Type.Boolean(),
        Type.Number(),
        Type.String(),
        Type.Array(Type.Ref("Value"), { readOnly: true }),
        Type.Record(Type.Ref("Value"), { readOnly: true }),
        Type.Function(
          [Type.Rest(Type.FunctionParameter("args", Type.Ref("Value")))],
          Type.Ref("Value"),
        ),
      ],
      {
        description:
          "Everything evaluating a bundle can produce, and nothing else.\n\n" +
          "The running end of the same domain a script is written against: what is a `JsxElement` there is the application of one here, a `State<T>` is the object of functions a client builds for it, and a spliced class is a plain function. Two representations rather than one, because collapsing them would make one side describe values it cannot hold.\n\n" +
          "A host's own nodes are not in here. What a tree builds belongs to the host that built it, and nothing a script can hold is one.",
      },
    ),

    ReadonlyState: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([], {
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
          "Declaring one is not here: `state()` is a name the compiler recognises, and declaring happens while a component is being expanded and has to know which instance is running. This is the half that reaches the client.",
      },
    ),

    Boolean: Type.Class(
      {
        valueOf: Type.Function([], Type.Boolean(), {
          description: "Returns the primitive value of the specified object.",
        }),
      },
      { boxes: "boolean" },
    ),

    Number: Type.Class(
      {
        toString: Type.Function(
          [
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
        toFixed: Type.Function(
          [
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
        toExponential: Type.Function(
          [
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
        toPrecision: Type.Function(
          [
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
        valueOf: Type.Function([], Type.Number(), {
          description: "Returns the primitive value of the specified object.",
        }),
      },
      { boxes: "number" },
    ),

    String: Type.Class(
      {
        toString: Type.Function([], Type.String(), {
          description: "Returns a string representation of a string.",
        }),
        charAt: Type.Function(
          [
            Type.FunctionParameter("pos", Type.Number(), {
              description: "The zero-based index of the desired character.",
            }),
          ],
          Type.String(),
          { description: "Returns the character at the specified index." },
        ),
        charCodeAt: Type.Function(
          [
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
        concat: Type.Function(
          [
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
        indexOf: Type.Function(
          [
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
        lastIndexOf: Type.Function(
          [
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
        localeCompare: Type.Function(
          [
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
        replace: Type.Function(
          [
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
        slice: Type.Function(
          [
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
        split: Type.Function(
          [
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
        substring: Type.Function(
          [
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
        toLowerCase: Type.Function([], Type.String(), {
          description:
            "Converts all the alphabetic characters in a string to lowercase.",
        }),
        toLocaleLowerCase: Type.Function(
          [
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
        toUpperCase: Type.Function([], Type.String(), {
          description:
            "Converts all the alphabetic characters in a string to uppercase.",
        }),
        toLocaleUpperCase: Type.Function(
          [
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
        trim: Type.Function([], Type.String(), {
          description:
            "Removes the leading and trailing white space and line terminator characters from a string.",
        }),
        length: Type.Number({
          readOnly: true,
          description: "Returns the length of a String object.",
        }),
        valueOf: Type.Function([], Type.String(), {
          description: "Returns the primitive value of the specified object.",
        }),
        index: Type.Index("index", Type.Number(), Type.String(), {
          readOnly: true,
        }),
      },
      { boxes: "string" },
    ),

    Array: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Class(
        {
          length: Type.Number({
            readOnly: true,
            description:
              "Gets the length of the array. This is a number one higher than the highest index in the array.",
          }),
          concat: Type.Function(
            [
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
            {
              description:
                "Combines two or more arrays. This method returns a new array without modifying any existing arrays.",
            },
          ),
          join: Type.Function(
            [
              Type.Optional(
                Type.FunctionParameter("separator", Type.String(), {
                  description:
                    "A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.",
                }),
              ),
            ],
            Type.String(),
            {
              description:
                "Adds all the elements of an array into a string, separated by the specified separator string.",
            },
          ),
          slice: Type.Function(
            [
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
            { description: "Returns a copy of a section of an array." },
          ),
          indexOf: Type.Function(
            [
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
            {
              description:
                "Returns the index of the first occurrence of a value in an array, or -1 if it is not present.",
            },
          ),
          includes: Type.Function(
            [
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
            {
              description:
                "Determines whether an array includes a certain element, returning true or false as appropriate.",
            },
          ),
          map: Type.Generic(
            [Type.GenericParameter("U")],
            Type.Function(
              [
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
          filter: Type.Function(
            [
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
            {
              description:
                "Returns the elements of an array that meet the condition specified in a callback function.",
            },
          ),
          with: Type.Function(
            [
              Type.FunctionParameter("index", Type.Number(), {
                description:
                  "The index of the value to overwrite. If the index is negative, then it replaces from the end of the array.",
              }),
              Type.FunctionParameter("value", Type.Ref("T"), {
                description: "The value to write into the copied array.",
              }),
            ],
            Type.Array(Type.Ref("T")),
            {
              description:
                "Copies an array, then overwrites the value at the provided index with the\ngiven value. If the index is negative, then it replaces from the end\nof the array.",
            },
          ),
          toSorted: Type.Function(
            [
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
            {
              description:
                "Returns a copy of an array with its elements sorted.\n\nThe comparator is required, where the standard library makes it optional:\nsorting without one compares the elements as strings, which is a rule of\nJavaScript's rather than of this language, and every other host would have\nto reproduce it to agree. Saying how to order two elements is the same\nwork and it ports.",
            },
          ),
          toReversed: Type.Function([], Type.Array(Type.Ref("T")), {
            description:
              "Returns a copy of an array with its elements in reverse order.",
          }),
          toSpliced: Type.Function(
            [
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
            {
              description:
                "Copies an array and removes elements while, if necessary, inserting new elements in their place, returning the remaining elements.",
            },
          ),
          index: Type.Index("index", Type.Number(), Type.Ref("T"), {
            readOnly: true,
          }),
        },
        { boxes: "array" },
      ),
    ),

    ArrayLike: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([], {
        length: Type.Number({ readOnly: true }),
        n: Type.Index("n", Type.Number(), Type.Ref("T"), { readOnly: true }),
      }),
    ),

    ArrayConstructor: Type.Class({
      from: Type.Generic(
        [Type.GenericParameter("T"), Type.GenericParameter("U")],
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
      of: Type.Generic(
        [Type.GenericParameter("T")],
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
    }),
  },

  // `for` is not here. It is a list rather than a tag today, recognised by the
  // value `For` and lowered to its own node kind, so declaring it as an element
  // would make `<for each={…}>` typecheck and then draw an element named "for".
  // It lands with the lowering that makes it true.
  elements: {},

  // What `declare var Math: Math` and `declare var Array: ArrayConstructor`
  // say in the lib: the name a script reaches, and the type it has. `Array`
  // needs a separate name for its type because `Array` is a type already —
  // the generic array type, which is the instance side.
  //
  // The lib is what declares these names; what is written here is which of
  // their members a script may reach.
  globals: {
    Math: Type.Ref("Math"),
    Array: Type.Ref("ArrayConstructor"),
  },

  builtins: {
    /** Storage a script may read and write, holding what it was given. */
    state: Type.Generic(
      // Bounded by `Value` rather than left open: a builtin is answered by a
      // client, and what a client holds is what a bundle carries.
      [Type.GenericParameter("T", Type.Ref("Value"))],
      Type.Function(
        [Type.FunctionParameter("initial", Type.Ref("T"))],
        Type.Apply(Type.Ref("State"), [Type.Ref("T")]),
      ),
    ),
  },
};
