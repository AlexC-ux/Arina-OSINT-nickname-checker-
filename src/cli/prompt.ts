import { stdin, stdout } from 'node:process';
import * as readline from 'node:readline/promises';

/** Thin wrapper around Node's readline interface used for all interactive input. */
export class Prompt {
  private readonly _interface = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  public async ask(question: string): Promise<string> {
    return this._interface.question(question);
  }

  public close(): void {
    this._interface.close();
  }
}
