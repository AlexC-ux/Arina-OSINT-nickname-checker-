/**
 * The three distinct `User-Agent` string literals used across
 * Arina/usernameMode.cs, kept verbatim (including the stray spaces in
 * `generic`, which is how they appear in the original C# source).
 */
export const USER_AGENTS = {
  generic: 'Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36',
  opera:
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 OPR/77.0.4054.90',
  androidMobile:
    'Mozilla/5.0 (Linux; Android 9; Pixel 2 XL Build/PPP3.180510.008) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
} as const;
