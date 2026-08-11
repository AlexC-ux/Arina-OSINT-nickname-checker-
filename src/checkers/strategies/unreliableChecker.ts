import { UsernameCheckResult, UsernameChecker } from '../types';

/**
 * Verification method for services whose HTTP response no longer
 * distinguishes an existing profile from a missing one. Confirmed for each
 * service using this checker by comparing a request for a known-real
 * profile against a request for a random, almost-certainly-unused
 * username: both produced an identical status code, redirect target and/or
 * response body (e.g. because the site is now a client-rendered SPA that
 * serves the same app shell either way, requires login to view profiles at
 * all, or blocks non-browser requests outright with a generic challenge
 * page). Making the request would only produce a misleading FOUND/NOT
 * FOUND verdict, so this always reports `unreliable` without even
 * attempting it.
 */
export class UnreliableChecker implements UsernameChecker {
  public constructor(
    public readonly service: string,
    private readonly _buildUrl: (username: string) => string,
  ) {}

  public async check(username: string): Promise<UsernameCheckResult> {
    return {
      service: this.service,
      status: 'unreliable',
      url: this._buildUrl(username),
    };
  }
}
