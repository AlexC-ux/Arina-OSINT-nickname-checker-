import { UsernameCheckResult, UsernameChecker } from '../types';

/**
 * Verification method used only by archive.is. `archive_is_username.Check`
 * never performs a real HTTP request - it just prints a search link and
 * used to always treat the profile as FOUND. That was misleading (it
 * looked like a confirmed match even though nothing was actually checked),
 * so this now reports the result as a `search_link` instead of `found`.
 */
export class SearchLinkChecker implements UsernameChecker {
  public constructor(
    public readonly service: string,
    private readonly _buildUrl: (username: string) => string,
  ) {}

  public async check(username: string): Promise<UsernameCheckResult> {
    return {
      service: this.service,
      status: 'search_link',
      url: this._buildUrl(username),
    };
  }
}
