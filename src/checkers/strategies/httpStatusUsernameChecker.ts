import { fetchStatus } from '../httpClient';
import { UsernameCheckResult, UsernameChecker } from '../types';

/**
 * Base class for the two status-code-based verification methods
 * (`HttpStatusNotFoundChecker` and `HttpStatusOkOnlyChecker`). Subclasses
 * only decide, from the response status, whether the profile was found;
 * everything else (building the request, building the printed URL,
 * default error handling) is shared here.
 */
export abstract class HttpStatusUsernameChecker implements UsernameChecker {
  public constructor(
    public readonly service: string,
    protected readonly buildCheckUrl: (username: string) => string,
    protected readonly buildDisplayUrl: (username: string) => string,
    protected readonly userAgent?: string,
    protected readonly redirect: RequestRedirect = 'follow',
  ) {}

  public async check(username: string): Promise<UsernameCheckResult> {
    try {
      const status = await fetchStatus(
        this.buildCheckUrl(username),
        this.userAgent,
        this.redirect,
      );
      const found = this.isFound(status);
      return {
        service: this.service,
        status: found ? 'found' : 'not_found',
        url: found ? this.buildDisplayUrl(username) : undefined,
      };
    } catch (error) {
      return this.handleError(error, username);
    }
  }

  protected abstract isFound(status: number): boolean;

  protected handleError(
    _error: unknown,
    _username: string,
  ): UsernameCheckResult {
    return { service: this.service, status: 'not_found' };
  }
}
