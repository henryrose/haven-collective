/** Paragraphs of a Markdown body, split on blank lines. */
export function paragraphs(body: string | undefined): string[] {
  return (body ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** First sentence of a body, with a trailing period. */
export function firstSentence(body: string | undefined): string {
  const first = paragraphs(body)[0] ?? '';
  const sentence = first.split(/(?<=\.)\s+/)[0] ?? '';
  return sentence.endsWith('.') ? sentence : `${sentence}.`;
}
