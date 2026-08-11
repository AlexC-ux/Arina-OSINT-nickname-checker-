import { readFileSync } from 'node:fs';

/**
 * Mirrors `File.ReadAllLines` from Program.cs mode 2: splits on any newline
 * style and keeps blank lines that occur in the middle of the file, but -
 * like `File.ReadAllLines` - does not produce a trailing empty entry for a
 * final trailing newline.
 */
export function readUsernamesFromFile(path: string): string[] {
  const lines = readFileSync(path, 'utf-8').split(/\r\n|\r|\n/);
  if (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines;
}
