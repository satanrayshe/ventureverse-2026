// Splits a heading into words so GSAP can slide each one up from behind a mask.
// Screen readers get the full sentence from the sr-only copy; the word spans are hidden from them.
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ")

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.1em] align-top">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </>
  )
}
