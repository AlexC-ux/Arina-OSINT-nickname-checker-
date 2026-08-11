import { ContentMarkerAbsenceChecker } from './strategies/contentMarkerAbsenceChecker';
import { ContentMarkerPresenceChecker } from './strategies/contentMarkerPresenceChecker';
import { HttpStatusNotFoundChecker } from './strategies/httpStatusNotFoundChecker';
import { HttpStatusOkOnlyChecker } from './strategies/httpStatusOkOnlyChecker';
import { PatreonChecker } from './strategies/patreonChecker';
import { RedirectUrlMarkerChecker } from './strategies/redirectUrlMarkerChecker';
import { SearchLinkChecker } from './strategies/searchLinkChecker';
import { UnreliableChecker } from './strategies/unreliableChecker';
import { UsernameChecker } from './types';
import { USER_AGENTS } from './userAgents';

/**
 * Builds the full list of username checkers, one per service, in the same
 * order they were invoked from `usernameMode.Start` in the original
 * Arina/usernameMode.cs. Every URL template, marker string and User-Agent
 * below is a direct port of the corresponding C# `Check` method, EXCEPT
 * where a service's verification method has since stopped working because
 * the site itself changed (see the inline comments on those entries) -
 * those were updated to either use a still-valid marker (e.g. Ebay) or to
 * report `unreliable` instead of guessing FOUND/NOT FOUND from a signal
 * that no longer means anything (e.g. VK, TikTok, Patreon's error path).
 * The WordPress/FanPop quirks that are still accurate are preserved as
 * documented on their respective strategy classes.
 */
export function createUsernameCheckers(): UsernameChecker[] {
  return [
    new HttpStatusNotFoundChecker(
      'GitHub',
      (u) => `https://api.github.com/users/${u}/events/public`,
      (u) => `https://github.com/${u}`,
      USER_AGENTS.generic,
    ),
    new ContentMarkerAbsenceChecker(
      'Steam',
      (u) => `https://steamcommunity.com/id/${u}`,
      () => 'linkStandard',
      USER_AGENTS.opera,
    ),
    new ContentMarkerAbsenceChecker(
      'Telegram',
      (u) => `https://t.me/${u}`,
      () => ', you can contact ',
    ),
    new HttpStatusNotFoundChecker(
      'Akniga',
      (u) => `http://akniga.org/profile/${u}/`,
      (u) => `http://akniga.org/profile/${u}/`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'MySpace',
      (u) => `https://myspace.com/${u}`,
      (u) => `https://myspace.com/${u}`,
      USER_AGENTS.opera,
    ),
    new HttpStatusNotFoundChecker(
      'Blogger',
      (u) => `http://${u}.blogspot.com`,
      (u) => `http://${u}.blogspot.com`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'AboutMe',
      (u) => `https://about.me/${u}`,
      (u) => `https://about.me/${u}`,
      USER_AGENTS.opera,
    ),
    new HttpStatusNotFoundChecker(
      'Gravatar',
      (u) => `http://en.gravatar.com/${u}`,
      (u) => `http://en.gravatar.com/${u}`,
      USER_AGENTS.opera,
    ),
    new HttpStatusOkOnlyChecker(
      'Jimbo',
      (u) => `https://${u}.jimdofree.com`,
      (u) => `https://${u}.jimdofree.com`,
      USER_AGENTS.opera,
    ),
    new HttpStatusOkOnlyChecker(
      'Tumblr',
      (u) => `https://${u}.tumblr.com/`,
      (u) => `https://${u}.tumblr.com/`,
      USER_AGENTS.opera,
    ),
    new RedirectUrlMarkerChecker(
      'WordPress',
      (u) => `https://${u.toLowerCase()}.wordpress.com`,
      (u) => `https://${u}.wordpress.com`,
      (u) => `subdomain=${u.toLowerCase()}`,
      USER_AGENTS.opera,
    ),
    // Reddit's frontend is now a client-rendered SPA (shreddit); the raw
    // server HTML no longer contains "Dive into anything" - or any other
    // distinguishing text - for either a real or a made-up username, and
    // its .json API blocks non-browser requests outright. Unreliable.
    new UnreliableChecker('Reddit', (u) => `https://www.reddit.com/user/${u}`),
    new HttpStatusNotFoundChecker(
      'Pikabu',
      (u) => `http://pikabu.ru/@${u}`,
      (u) => `http://pikabu.ru/@${u}`,
      USER_AGENTS.generic,
    ),
    // m.vk.com serves the same generic (unauthenticated) shell page for a
    // real profile and a made-up one alike - 200 OK with an identical
    // <title> either way. Unreliable.
    new UnreliableChecker('VK', (u) => `https://vk.com/${u}`),
    // TikTok returns a byte-for-byte identical anti-bot challenge page
    // (200 OK) for every non-browser request, regardless of username.
    // Unreliable.
    new UnreliableChecker('TikTok', (u) => `https://www.tiktok.com/@${u}`),
    // Pinterest's profile page is a client-rendered SPA shell - 200 OK for
    // both a real and a made-up username. Unreliable.
    new UnreliableChecker(
      'Pinterest',
      (u) => `https://www.pinterest.com/${u}/_saved/`,
    ),
    // m.twitch.tv also returns the same 200 OK SPA shell for both a real
    // channel and a made-up one. Unreliable.
    new UnreliableChecker('Twitch', (u) => `https://m.twitch.tv/${u}`),
    new HttpStatusOkOnlyChecker(
      'YouTube',
      (u) => `https://www.youtube.com/user/${u}`,
      (u) => `https://www.youtube.com/user/${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'Vimeo',
      (u) => `https://vimeo.com/${u}`,
      (u) => `https://vimeo.com/${u}`,
      USER_AGENTS.opera,
    ),
    new HttpStatusNotFoundChecker(
      'FaceBook',
      (u) => `https://www.facebook.com/${u}`,
      (u) => `https://www.facebook.com/${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'Habr',
      (u) => `https://habr.com/ru/users/${u}/`,
      (u) => `https://habr.com/ru/users/${u}/`,
      USER_AGENTS.generic,
    ),
    new PatreonChecker(
      'Patreon',
      (u) => `https://www.patreon.com/${u}/creators`,
      (u) => `https://www.patreon.com/${u}/creators`,
      USER_AGENTS.opera,
    ),
    // open.spotify.com/user/<name> redirects to the same regional
    // "why-not-available" page (200 OK) for the real "spotify" account and
    // for a made-up username alike - it's a region block, unrelated to
    // whether the profile exists. Unreliable.
    new UnreliableChecker(
      'Spotify',
      (u) => `https://open.spotify.com/user/${u}`,
    ),
    new HttpStatusNotFoundChecker(
      'YandexMusic',
      (u) => `https://music.yandex.ru/users/${u}/playlists`,
      (u) => `https://music.yandex.ru/users/${u}/playlists`,
      USER_AGENTS.generic,
    ),
    // The ": 404" marker is gone from market.yandex.ru's current (SPA)
    // markup - a made-up username's page comes back as a generic,
    // unindexed shell (empty og:description, "noindex, nofollow") rather
    // than containing that string, so absence-of-marker now means FOUND
    // for virtually anything. No verified replacement marker was found.
    // Unreliable.
    new UnreliableChecker(
      'YandexMarket',
      (u) => `https://market.yandex.ru/user/${u}/reviews`,
    ),
    // zen.yandex.com now redirects every profile request - real or
    // made-up - to a Yandex Passport login/captcha wall (200 OK). Viewing
    // a profile requires being logged in, so an anonymous request can't
    // tell existing and non-existing usernames apart. Unreliable.
    new UnreliableChecker('YandexZen', (u) => `https://zen.yandex.com/${u}`),
    new HttpStatusNotFoundChecker(
      'SoundCloud',
      (u) => `https://soundcloud.com/${u}`,
      (u) => `https://soundcloud.com/${u}`,
      USER_AGENTS.androidMobile,
    ),
    // eBay's old "Profile - error" marker is gone from the current
    // profilenode markup; a missing profile now renders a
    // "Sorry, this user was not found." status message instead (verified
    // against a made-up username and against the real "ebay" account).
    new ContentMarkerAbsenceChecker(
      'Ebay',
      (u) => `https://www.ebay.com/usr/${u}`,
      () => 'Sorry, this user was not found.',
    ),
    new ContentMarkerPresenceChecker(
      'PayPal',
      (u) => `https://www.paypal.com/paypalme/${u}`,
      (u) => `PayPal.me/${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'Wikipedia',
      (u) => `https://ru.wikipedia.org/wiki/Участник:${u}`,
      (u) => `https://ru.wikipedia.org/wiki/Участник:${u}`,
      USER_AGENTS.opera,
    ),
    new HttpStatusNotFoundChecker(
      'HubPages',
      (u) => `https://hubpages.com/@${u}`,
      (u) => `https://hubpages.com/@${u}`,
      USER_AGENTS.opera,
    ),
    new HttpStatusNotFoundChecker(
      'PornHub',
      (u) => `https://rt.pornhub.com/users/${u}`,
      (u) => `https://rt.pornhub.com/users/${u}`,
      USER_AGENTS.generic,
    ),
    new SearchLinkChecker(
      'ArchiveIs',
      (u) => `http://archive.is/search/?text=${u}`,
    ),
    new HttpStatusNotFoundChecker(
      'Flicklr',
      (u) => `https://www.flickr.com/people/${u}/`,
      (u) => `https://www.flickr.com/people/${u}/`,
      USER_AGENTS.opera,
    ),
    // slideshare.net now returns 451 (Unavailable For Legal Reasons) for
    // profile pages regardless of username - a legal/geo block unrelated
    // to whether the account exists, and not a 404. Unreliable.
    new UnreliableChecker(
      'SlideShare',
      (u) => `https://www.slideshare.net/${u}`,
    ),
    new HttpStatusOkOnlyChecker(
      'FanPop',
      (u) => `https://www.fanpop.com/fans/${u}`,
      // Bug-for-bug port of the original: on success, `fanpop_username.Check`
      // prints a Wikipedia URL instead of the FanPop profile URL (leftover
      // copy-paste from wiki_username.Check).
      (u) => `https://ru.wikipedia.org/wiki/Участник:${u}`,
      USER_AGENTS.opera,
    ),
    new HttpStatusOkOnlyChecker(
      'TenChat',
      (u) => `https://tenchat.ru/${u}`,
      (u) => `https://tenchat.ru/${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusOkOnlyChecker(
      'BuyMeACoffe',
      (u) => `https://www.buymeacoffee.com/${u}`,
      (u) => `https://www.buymeacoffee.com/${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusOkOnlyChecker(
      '9GAG',
      (u) => `https://9gag.com/u/${u}`,
      (u) => `https://9gag.com/u/${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusOkOnlyChecker(
      'LastFm',
      (u) => `https://www.last.fm/user/${u}`,
      (u) => `https://www.last.fm/user/${u}`,
      USER_AGENTS.generic,
    ),
    // eyeem.com now unconditionally 301-redirects every profile URL to
    // freepik.com/photos (a generic page, unrelated to the username) -
    // the site migrated wholesale to Freepik and no longer has per-user
    // profile pages at all. Unreliable.
    new UnreliableChecker(
      'EyeEm',
      (u) => `https://www.eyeem.com/u/${u}/photos`,
    ),
    new HttpStatusOkOnlyChecker(
      'Disqus',
      (u) => `https://disqus.com/by/${u}/`,
      (u) => `https://disqus.com/by/${u}/`,
      USER_AGENTS.generic,
    ),
  ];
}
