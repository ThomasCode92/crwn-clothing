/**
 * A utility function that works as a tagged template literal processor.
 * It returns the raw string representation, preserving escape sequences.
 *
 * This can be used for sorting Tailwind classes in a consistent order.
 *
 * @param {TemplateStringsArray} strings - The array of string parts from the tagged template.
 * @param {...string[]} values - The interpolated values in the template.
 * @returns {string} - The raw string with interpolated values, preserving escape sequences.
 *
 * @example
 * const name = "Alice";
 * const message = tw`Hello, ${name}\nWelcome!`;
 * console.log(message); // Output: Hello, Alice\nWelcome!
 *
 * // order Tailwind classes
 * const classes = tw`text-center p-8`; // Replace `text-center·p-8` with `p-8·text-center`
 */
export default function tw(
  strings: TemplateStringsArray,
  ...values: string[]
): string {
  return String.raw({ raw: strings }, ...values);
}
