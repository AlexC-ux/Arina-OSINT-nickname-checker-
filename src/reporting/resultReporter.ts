import { UsernameCheckResult } from '../checkers/types';

/**
 * Prints a single check result exactly like the original C# `Console.WriteLine`
 * calls: `[+] Service : url` when found, `[-] Service : NOT FOUND` otherwise.
 *
 * The `silent`/`rawMessage` branch exists only for the WordPress checker's
 * preserved original quirk of never printing "NOT FOUND" on error.
 */
export class ResultReporter {
  public report(result: UsernameCheckResult): void {
    if (result.silent) {
      if (result.rawMessage !== undefined) {
        console.log(result.rawMessage);
      }
      return;
    }

    if (result.found) {
      console.log(`[+] ${result.service} : ${result.url}`);
    } else {
      console.log(`[-] ${result.service} : NOT FOUND`);
    }
  }
}
