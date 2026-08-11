import { NicknameChecker } from '../services/nicknameChecker';
import { readUsernamesFromFile } from '../utils/fileReader';
import { Prompt } from './prompt';

/** Port of `Program.Main`: asks for a mode, then runs it. */
export class Cli {
  public constructor(
    private readonly _prompt: Prompt,
    private readonly _nicknameChecker: NicknameChecker,
  ) {}

  public async run(): Promise<void> {
    console.log('Select mode:\n            1 - username');
    console.log('            \n            2 - usernames list (.txt)');
    const mode = await this._prompt.ask('');

    switch (mode) {
      case '1': {
        const target = await this._prompt.ask('\n            username:\n');
        await this._nicknameChecker.run(target);
        break;
      }
      case '2': {
        const target = await this._prompt.ask('\n            path:\n');
        const usernames = readUsernamesFromFile(target);
        for (const username of usernames) {
          await this._nicknameChecker.run(username);
        }
        break;
      }
      default:
        break;
    }

    this._prompt.close();
  }
}
