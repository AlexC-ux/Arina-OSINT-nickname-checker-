import { UsernameCheckResult } from '../types';
import { HttpStatusNotFoundChecker } from './httpStatusNotFoundChecker';

/**
 * Patreon reuses the "not found on 404" verification method, but
 * `patreon_username.Check` has a distinct original quirk in its `catch`
 * block: instead of always reporting NOT FOUND on a request failure, it
 * inspects the exception text and only reports NOT FOUND when that text
 * contains "404" - any other failure is (bug-for-bug) reported as FOUND.
 * Preserved verbatim here.
 */
export class PatreonChecker extends HttpStatusNotFoundChecker {
  protected handleError(error: unknown, username: string): UsernameCheckResult {
    const message = error instanceof Error ? error.message : String(error);
    const found = !message.includes('404');
    return {
      service: this.service,
      found,
      url: found ? this.buildDisplayUrl(username) : undefined,
    };
  }
}
