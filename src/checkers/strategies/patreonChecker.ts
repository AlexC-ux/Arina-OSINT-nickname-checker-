import { UsernameCheckResult } from '../types';
import { HttpStatusNotFoundChecker } from './httpStatusNotFoundChecker';

/**
 * Patreon reuses the "not found on 404" verification method, but
 * `patreon_username.Check` has a distinct original quirk in its `catch`
 * block: instead of always reporting NOT FOUND on a request failure, it
 * inspects the exception text and only reports NOT FOUND when that text
 * contains "404" - any other failure was (bug-for-bug) reported as FOUND.
 *
 * That default-to-FOUND behaviour is no longer preserved: patreon.com now
 * blocks non-browser requests at the TLS handshake level for virtually any
 * username (confirmed - the connection resets before a response is ever
 * received), so treating every non-404 failure as FOUND made this checker
 * report FOUND almost unconditionally. A non-404 failure now reports
 * `unreliable` instead, since we genuinely can't tell if the profile
 * exists.
 */
export class PatreonChecker extends HttpStatusNotFoundChecker {
  protected handleError(error: unknown, username: string): UsernameCheckResult {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('404')) {
      return { service: this.service, status: 'not_found' };
    }
    return {
      service: this.service,
      status: 'unreliable',
      url: this.buildDisplayUrl(username),
    };
  }
}
