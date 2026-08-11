/**
 * Outcome of a single service check:
 * - `found` / `not_found`: the check has a reliable signal either way.
 * - `unreliable`: the service's HTTP response no longer distinguishes an
 *   existing profile from a missing one (confirmed by comparing a real
 *   profile against a random one - both produced the identical status,
 *   redirect or body), so no found/not-found verdict can be trusted.
 * - `search_link`: the checker never verifies anything - it only prints a
 *   link to search elsewhere for the username (used by ArchiveIs).
 */
export type UsernameCheckStatus =
  'found' | 'not_found' | 'unreliable' | 'search_link';

/**
 * Result of a single username presence check against one service.
 *
 * `rawMessage`/`silent` only exist to preserve the WordPress checker's
 * unusual original error reporting (see RedirectUrlMarkerChecker) and are
 * unused by every other checker.
 */
export interface UsernameCheckResult {
  readonly service: string;
  readonly status: UsernameCheckStatus;
  readonly url?: string;
  readonly silent?: boolean;
  readonly rawMessage?: string;
}

export interface UsernameChecker {
  readonly service: string;
  check(username: string): Promise<UsernameCheckResult>;
}
