import { fetchBody } from '../httpClient';
import { UsernameCheckResult, UsernameChecker } from '../types';

/**
 * Base class for the two content-marker-based verification methods
 * (`ContentMarkerAbsenceChecker` and `ContentMarkerPresenceChecker`). These
 * are used when a service answers with `200 OK` even for a missing
 * profile, so the response body itself has to be inspected for a marker
 * string, just like `WebClient.DownloadString` + `string.Contains(...)` in
 * the original C# checkers (Steam, Telegram, Reddit, YandexMarket, eBay,
 * PayPal).
 */
export abstract class HttpContentUsernameChecker implements UsernameChecker {
  public constructor(
    public readonly service: string,
    protected readonly buildUrl: (username: string) => string,
    protected readonly buildMarker: (username: string) => string,
    protected readonly userAgent?: string,
  ) {}

  public async check(username: string): Promise<UsernameCheckResult> {
    const url = this.buildUrl(username);
    try {
      const body = await fetchBody(url, this.userAgent);
      const found = this.isFound(body, this.buildMarker(username));
      return { service: this.service, found, url: found ? url : undefined };
    } catch {
      return { service: this.service, found: false };
    }
  }

  protected abstract isFound(body: string, marker: string): boolean;
}
