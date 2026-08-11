import { HttpStatusUsernameChecker } from './httpStatusUsernameChecker';

/**
 * Verification method: the profile is considered FOUND only when the
 * response status is exactly 200 - any other status (including redirects
 * or server errors) counts as NOT FOUND. Ported from checkers such as
 * `yt_username`, `pinterest_username` and `tumblr_username`, which compare
 * `response.StatusCode != HttpStatusCode.OK`.
 */
export class HttpStatusOkOnlyChecker extends HttpStatusUsernameChecker {
  protected isFound(status: number): boolean {
    return status === 200;
  }
}
