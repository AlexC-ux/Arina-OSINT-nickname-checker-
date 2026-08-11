/**
 * Result of a single username presence check against one service.
 *
 * `rawMessage`/`silent` only exist to preserve the WordPress checker's
 * unusual original error reporting (see RedirectUrlMarkerChecker) and are
 * unused by every other checker.
 */
export interface UsernameCheckResult {
  readonly service: string;
  readonly found: boolean;
  readonly url?: string;
  readonly silent?: boolean;
  readonly rawMessage?: string;
}

export interface UsernameChecker {
  readonly service: string;
  check(username: string): Promise<UsernameCheckResult>;
}
