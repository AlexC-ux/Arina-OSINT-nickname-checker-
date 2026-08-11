import { HttpContentUsernameChecker } from './httpContentUsernameChecker';

/**
 * Verification method: the profile is considered NOT FOUND when the marker
 * text IS present in the response body (the marker only appears on the
 * "placeholder"/error page). Ported from `steam_username` (`linkStandard`),
 * `tg_username` (`, you can contact `), `reddit_username`
 * (`Dive into anything`), `ya_market_username` (`: 404`) and
 * `ebay_username` (`Profile - error`).
 */
export class ContentMarkerAbsenceChecker extends HttpContentUsernameChecker {
  protected isFound(body: string, marker: string): boolean {
    return !body.includes(marker);
  }
}
