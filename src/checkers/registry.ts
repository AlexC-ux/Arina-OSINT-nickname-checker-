import { AlwaysFoundChecker } from './strategies/alwaysFoundChecker';
import { ContentMarkerAbsenceChecker } from './strategies/contentMarkerAbsenceChecker';
import { ContentMarkerPresenceChecker } from './strategies/contentMarkerPresenceChecker';
import { HttpStatusNotFoundChecker } from './strategies/httpStatusNotFoundChecker';
import { HttpStatusOkOnlyChecker } from './strategies/httpStatusOkOnlyChecker';
import { PatreonChecker } from './strategies/patreonChecker';
import { RedirectUrlMarkerChecker } from './strategies/redirectUrlMarkerChecker';
import { UsernameChecker } from './types';
import { USER_AGENTS } from './userAgents';

/**
 * Builds the full list of username checkers, one per service, in the same
 * order they were invoked from `usernameMode.Start` in the original
 * Arina/usernameMode.cs. Every URL template, marker string and User-Agent
 * below is a direct, unmodified port of the corresponding C# `Check`
 * method - including the WordPress/Patreon/FanPop quirks documented on
 * their respective strategy classes.
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
    new ContentMarkerAbsenceChecker(
      'Reddit',
      (u) => `https://www.reddit.com/user/${u}`,
      () => 'Dive into anything',
    ),
    new HttpStatusNotFoundChecker(
      'Pikabu',
      (u) => `http://pikabu.ru/@${u}`,
      (u) => `http://pikabu.ru/@${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'VK',
      (u) => `https://m.vk.com/${u}`,
      (u) => `https://vk.com/${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'TikTok',
      (u) => `https://www.tiktok.com/@${u}`,
      (u) => `https://www.tiktok.com/@${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusOkOnlyChecker(
      'Pinterest',
      (u) => `https://www.pinterest.com/${u}/_saved/`,
      (u) => `https://www.pinterest.com/${u}/_saved/`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'Twitch',
      (u) => `https://m.twitch.tv/${u}?desktop-redirect=true`,
      (u) => `https://m.twitch.tv/${u}`,
      USER_AGENTS.generic,
    ),
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
    new HttpStatusNotFoundChecker(
      'Spotify',
      (u) => `https://open.spotify.com/user/${u}`,
      (u) => `https://open.spotify.com/user/${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'YandexMusic',
      (u) => `https://music.yandex.ru/users/${u}/playlists`,
      (u) => `https://music.yandex.ru/users/${u}/playlists`,
      USER_AGENTS.generic,
    ),
    new ContentMarkerAbsenceChecker(
      'YandexMarket',
      (u) => `https://market.yandex.ru/user/${u}/reviews`,
      () => ': 404',
    ),
    new HttpStatusNotFoundChecker(
      'YandexZen',
      (u) => `https://zen.yandex.com/${u}`,
      (u) => `https://zen.yandex.com/${u}`,
      USER_AGENTS.generic,
    ),
    new HttpStatusNotFoundChecker(
      'SoundCloud',
      (u) => `https://soundcloud.com/${u}`,
      (u) => `https://soundcloud.com/${u}`,
      USER_AGENTS.androidMobile,
    ),
    new ContentMarkerAbsenceChecker(
      'Ebay',
      (u) => `https://www.ebay.com/usr/${u}`,
      () => 'Profile - error',
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
    new AlwaysFoundChecker(
      'ArchiveIs',
      (u) => `http://archive.is/search/?text=${u}`,
    ),
    new HttpStatusNotFoundChecker(
      'Flicklr',
      (u) => `https://www.flickr.com/people/${u}/`,
      (u) => `https://www.flickr.com/people/${u}/`,
      USER_AGENTS.opera,
    ),
    new HttpStatusNotFoundChecker(
      'SlideShare',
      (u) => `https://www.slideshare.net/${u}`,
      (u) => `https://www.slideshare.net/${u}`,
      USER_AGENTS.opera,
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
    new HttpStatusOkOnlyChecker(
      'EyeEm',
      (u) => `https://www.eyeem.com/u/${u}/photos`,
      (u) => `https://www.eyeem.com/u/${u}/photos`,
      USER_AGENTS.generic,
    ),
    new HttpStatusOkOnlyChecker(
      'Disqus',
      (u) => `https://disqus.com/by/${u}/`,
      (u) => `https://disqus.com/by/${u}/`,
      USER_AGENTS.generic,
    ),
  ];
}
