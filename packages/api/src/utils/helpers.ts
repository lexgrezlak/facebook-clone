// "  hello world" => "Hello World"
export function trimAndCapitalizeSentence(string: string) {
  return string
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w: string) =>
      w.replace(/^\w/, (c: string) => c.toUpperCase())
    );
}
