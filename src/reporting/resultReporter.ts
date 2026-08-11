import { UsernameCheckResult } from '../checkers/types';

/**
 * Prints a single check result. `[+]` for a confirmed match, `[-]` for a
 * confirmed miss, and `[?]` for results that can't be trusted either way
 * (unreliable service, or a search-link-only checker like ArchiveIs).
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

    switch (result.status) {
      case 'found':
        console.log(`[+] ${result.service} : ${result.url}`);
        break;
      case 'search_link':
        console.log(
          `[?] ${result.service} : ${result.url} (search link, not a verified match)`,
        );
        break;
      case 'unreliable':
        console.log(
          `[?] ${result.service} : ${result.url} (unreliable - site can't confirm whether the profile exists)`,
        );
        break;
      case 'not_found':
      default:
        console.log(`[-] ${result.service} : NOT FOUND`);
        break;
    }
  }
}
