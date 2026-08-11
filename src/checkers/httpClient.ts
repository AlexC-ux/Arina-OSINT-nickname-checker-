const REQUEST_TIMEOUT_MS = 15_000;

function buildHeaders(userAgent?: string): HeadersInit | undefined {
  return userAgent ? { 'User-Agent': userAgent } : undefined;
}

async function request(url: string, userAgent?: string): Promise<Response> {
  return fetch(url, {
    headers: buildHeaders(userAgent),
    redirect: 'follow',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

/** Used by checkers that only inspect the HTTP status code. */
export async function fetchStatus(
  url: string,
  userAgent?: string,
): Promise<number> {
  const response = await request(url, userAgent);
  return response.status;
}

/** Used by the WordPress checker, which decides presence from the final (post-redirect) URL. */
export async function fetchFinalUrl(
  url: string,
  userAgent?: string,
): Promise<string> {
  const response = await request(url, userAgent);
  return response.url;
}

/**
 * Used by checkers ported from `System.Net.WebClient.DownloadString`. That
 * .NET API throws a `WebException` for any non-2xx response instead of
 * returning the body, so this throws too - callers rely on that to fall
 * back to a NOT FOUND result, exactly like the original `catch` blocks.
 */
export async function fetchBody(
  url: string,
  userAgent?: string,
): Promise<string> {
  const response = await request(url, userAgent);
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }
  return response.text();
}
