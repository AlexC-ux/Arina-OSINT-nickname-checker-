import { HttpContentUsernameChecker } from './httpContentUsernameChecker';

/**
 * Verification method: the inverse of `ContentMarkerAbsenceChecker` - the
 * profile is considered FOUND only when the marker text IS present.
 * Ported from `pp_username` (PayPal.Me), whose marker
 * (`PayPal.me/{username}`) only echoes back on a page for a profile that
 * actually exists.
 */
export class ContentMarkerPresenceChecker extends HttpContentUsernameChecker {
  protected isFound(body: string, marker: string): boolean {
    return body.includes(marker);
  }
}
