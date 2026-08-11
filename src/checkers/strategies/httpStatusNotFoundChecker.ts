import { HttpStatusUsernameChecker } from './httpStatusUsernameChecker';

/**
 * Verification method: the profile is considered FOUND for any response
 * status other than 404. This is the most common check in the original
 * codebase, e.g. `github_username`, `vk_username`, `habr_username`, etc.,
 * all of which compare `response.StatusCode == HttpStatusCode.NotFound`.
 */
export class HttpStatusNotFoundChecker extends HttpStatusUsernameChecker {
  protected isFound(status: number): boolean {
    return status !== 404;
  }
}
