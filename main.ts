// One Line, One Laugh — entry program.
// Writes one original one-liner to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt when set, for local testing).
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "We used a Ouija board to contact my dead grandfather. He spelled out: 'STOP USING MY WIFI.'";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, { encoding: "utf8", mode: 0o644 });
chmodSync(target, 0o644); // umask must not narrow the output file
console.log(`wrote ${chars} characters to ${target}`);
