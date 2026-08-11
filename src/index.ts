import { createUsernameCheckers } from './checkers/registry';
import { Cli } from './cli/cli';
import { Prompt } from './cli/prompt';
import { UsernameSanitizer } from './cli/usernameSanitizer';
import { ResultReporter } from './reporting/resultReporter';
import { NicknameChecker } from './services/nicknameChecker';

const run = async (): Promise<void> => {
  const prompt = new Prompt();
  const sanitizer = new UsernameSanitizer(prompt);
  const reporter = new ResultReporter();
  const checkers = createUsernameCheckers();
  const nicknameChecker = new NicknameChecker(checkers, sanitizer, reporter);
  const cli = new Cli(prompt, nicknameChecker);

  await cli.run();
};

run()
  .then(() => true)
  .catch((e) => console.error(e));
