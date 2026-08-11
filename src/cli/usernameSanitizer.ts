import { Prompt } from './prompt';

/**
 * Faithful port of the space-handling block at the top of
 * `usernameMode.Start` (Arina/usernameMode.cs). When the username contains
 * a space, the user is asked for a separator and the words are re-joined
 * with it. The original join loop is deliberately verbose - it special-cases
 * exactly two words (printing an extra debug line in that case only) before
 * falling through to a general loop - but for any number of words it always
 * produces the same result as `parts.join(separator)`. Both the result and
 * that quirky intermediate console output are preserved here.
 */
export class UsernameSanitizer {
  public constructor(private readonly _prompt: Prompt) {}

  public async sanitize(username: string): Promise<string> {
    if (!username.includes(' ')) {
      return username;
    }

    const parts = username.split(' ');
    const separator = await this._prompt.ask(
      'Username contains space, which separator to use? (_|.|none|another character)\n',
    );

    let joined = '';
    let i = 0;
    if (i + 2 === parts.length) {
      joined += parts[i] + separator + parts[i + 1];
      console.log(joined);
    }
    for (i = 0; i < parts.length - 2; i++) {
      joined += parts[i] + separator;
      if (i + 1 >= parts.length - 2) {
        joined += parts[i + 1] + separator + parts[i + 2];
      }
    }

    console.log(`Username: ${joined}`);
    return joined;
  }
}
