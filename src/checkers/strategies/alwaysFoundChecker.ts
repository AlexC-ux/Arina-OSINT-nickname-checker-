import { UsernameCheckResult, UsernameChecker } from '../types';

/**
 * Verification method used only by archive.is. `archive_is_username.Check`
 * never performs a real HTTP request - it just prints a search link and
 * always treats the profile as FOUND.
 */
export class AlwaysFoundChecker implements UsernameChecker {
  public constructor(
    public readonly service: string,
    private readonly _buildUrl: (username: string) => string,
  ) {}

  public async check(username: string): Promise<UsernameCheckResult> {
    return {
      service: this.service,
      found: true,
      url: this._buildUrl(username),
    };
  }
}
