import { fetchFinalUrl } from '../httpClient';
import { UsernameCheckResult, UsernameChecker } from '../types';

/**
 * Verification method used only by WordPress. wordpress.com answers
 * `200 OK` for both existing and non-existing subdomains, but silently
 * redirects non-existing ones to a search page whose final URL contains a
 * `subdomain=<username>` marker - so presence is decided from the
 * post-redirect URL rather than the status code.
 *
 * `wp_username.Check` also has an unusual original error path: on a
 * request failure it never prints "NOT FOUND" - it only logs the raw
 * exception text, and only when that text happens to contain a space
 * (`ex.ToString().Contains(" ")`), staying completely silent otherwise.
 * That behaviour is preserved via the `silent`/`rawMessage` result fields.
 */
export class RedirectUrlMarkerChecker implements UsernameChecker {
  public constructor(
    public readonly service: string,
    private readonly _buildCheckUrl: (username: string) => string,
    private readonly _buildDisplayUrl: (username: string) => string,
    private readonly _buildNotFoundMarker: (username: string) => string,
    private readonly _userAgent?: string,
  ) {}

  public async check(username: string): Promise<UsernameCheckResult> {
    try {
      const finalUrl = await fetchFinalUrl(
        this._buildCheckUrl(username),
        this._userAgent,
      );
      const found = !finalUrl.includes(this._buildNotFoundMarker(username));
      return {
        service: this.service,
        found,
        url: found ? this._buildDisplayUrl(username) : undefined,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        service: this.service,
        found: false,
        silent: true,
        rawMessage: message.includes(' ') ? message : undefined,
      };
    }
  }
}
