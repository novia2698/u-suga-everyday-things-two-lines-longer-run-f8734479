// main.ts — "Everyday Things, Two Lines, Longer Run" (make.fun bounty)
// Writes a two-line explanation of one everyday thing to /output/entry.txt.
//
// Line 1 explains a traffic jam to a 10-year-old in one vivid sentence,
// built on a single analogy: a garden hose with a kink in it.
// Line 2 says in one sentence why the analogy works: what it maps and
// what it leaves out.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "A traffic jam is a garden hose with a kink in it: cars are water piling up behind the bend, waiting for the road ahead to straighten out.";
const LINE_2 =
  "The kink maps the squeeze — too many cars trying through too little road — but it leaves out that drivers choose when to stop and go, while water never chooses anything.";

const text = LINE_1 + "\n" + LINE_2;

// The sealed scorer only accepts 1–400 UTF-8 characters, two lines.
// Fail loudly instead of writing an entry the gate would throw out.
if (text.length < 1 || text.length > 400) {
  throw new Error(`entry.txt must be 1-400 chars, got ${text.length}`);
}
if (text.split("\n").length !== 2) {
  throw new Error("entry.txt must hold exactly two lines");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");
console.log(`wrote ${text.length} chars to ${outPath}`);
