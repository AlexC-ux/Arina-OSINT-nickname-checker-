import { UsernameChecker } from '../checkers/types';
import { UsernameSanitizer } from '../cli/usernameSanitizer';
import { ResultReporter } from '../reporting/resultReporter';

/**
 * Orchestrates a single username's run: prints the header (using the raw,
 * pre-sanitized username, exactly like the original `usernameMode.Start`),
 * sanitizes it, then runs every registered checker sequentially and reports
 * each result as it completes.
 */
export class NicknameChecker {
  public constructor(
    private readonly _checkers: readonly UsernameChecker[],
    private readonly _sanitizer: UsernameSanitizer,
    private readonly _reporter: ResultReporter,
  ) {}

  public async run(rawUsername: string): Promise<void> {
    console.log(`\nProfiles of ${rawUsername}:`);
    const username = await this._sanitizer.sanitize(rawUsername);

    for (const checker of this._checkers) {
      const result = await checker.check(username);
      this._reporter.report(result);
    }
  }
}
