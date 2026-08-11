# Arina-OSINT — Nickname Checker

🇷🇺 [Русский](#русский) · 🇬🇧 [English](#english)

Если проект оказался полезен — поставьте ⭐ / If this project was useful to you, please give it a ⭐

---

## Русский

### О проекте

**Arina-OSINT** — консольный OSINT-инструмент (Open Source Intelligence) для поиска аккаунтов, зарегистрированных под определённым никнеймом, на десятках популярных сайтов и сервисов. Инструмент удобен для поиска забытых/старых страниц, проверки "цифрового следа" никнейма или расследований в рамках OSINT.

Исторически проект был написан на C# (.NET Core), текущая версия — это полный порт логики оригинала на **TypeScript / Node.js**, с сохранением поведения всех проверок (URL-шаблоны, маркеры контента, User-Agent) 1:1.

Как это работает: для введённого никнейма инструмент последовательно обращается к каждому сервису (по прямому запросу к профилю или API) и определяет, существует ли аккаунт с таким именем — по HTTP-статусу ответа, наличию/отсутствию маркера в содержимом страницы или по URL после редиректа.

### Доступные сервисы

Всего поддерживается **44 сервиса**. Для каждого проверяется, существует ли страница/профиль с введённым никнеймом по указанному адресу:

| # | Сервис | Описание | Что проверяется |
|---|--------|----------|------------------|
| 1 | GitHub | Хостинг репозиториев и совместная разработка кода | `github.com/<ник>` |
| 2 | Steam | Платформа цифровой дистрибуции игр | `steamcommunity.com/id/<ник>` |
| 3 | Telegram | Мессенджер | `t.me/<ник>` |
| 4 | Akniga | Сайт аудиокниг | `akniga.org/profile/<ник>` |
| 5 | MySpace | Социальная сеть | `myspace.com/<ник>` |
| 6 | Blogger | Блог-платформа от Google | `<ник>.blogspot.com` |
| 7 | About.me | Персональные визитки-страницы | `about.me/<ник>` |
| 8 | Gravatar | Сервис глобальных аватаров | `en.gravatar.com/<ник>` |
| 9 | Jimdo | Конструктор сайтов | `<ник>.jimdofree.com` |
| 10 | Tumblr | Блог-платформа/микроблоги | `<ник>.tumblr.com` |
| 11 | WordPress | Платформа для блогов и сайтов | `<ник>.wordpress.com` |
| 12 | Reddit | Форумы и агрегатор новостей | `reddit.com/user/<ник>` |
| 13 | Pikabu | Российская развлекательная площадка | `pikabu.ru/@<ник>` |
| 14 | ВКонтакте (VK) | Социальная сеть | `vk.com/<ник>` |
| 15 | TikTok | Платформа коротких видео | `tiktok.com/@<ник>` |
| 16 | Pinterest | Подборки изображений/идей | `pinterest.com/<ник>` |
| 17 | Twitch | Стриминговая платформа | `twitch.tv/<ник>` |
| 18 | YouTube | Видеохостинг | `youtube.com/user/<ник>` |
| 19 | Vimeo | Видеохостинг | `vimeo.com/<ник>` |
| 20 | Facebook | Социальная сеть | `facebook.com/<ник>` |
| 21 | Habr | IT-сообщество и блог-платформа | `habr.com/ru/users/<ник>` |
| 22 | HabrCareer | IT-платформа для поиска работы и резюме | `career.habr.com/<ник>` |
| 23 | Patreon | Платформа поддержки авторов (донаты) | `patreon.com/<ник>` |
| 24 | Spotify | Музыкальный стриминг | `open.spotify.com/user/<ник>` |
| 25 | Yandex Music | Музыкальный сервис Яндекса | `music.yandex.ru/users/<ник>` |
| 26 | Yandex Market | Маркетплейс Яндекса | `market.yandex.ru/user/<ник>` |
| 27 | Dzen | Платформа блогов/статей Яндекса | `dzen.ru/user/<ник>` |
| 28 | Yandex Questions | Экспертная Q&A-платформа Яндекса (Кью) | `yandex.ru/q/profile/<ник>` |
| 29 | SoundCloud | Платформа для музыки и подкастов | `soundcloud.com/<ник>` |
| 30 | Ebay | Торговая площадка/аукцион | `ebay.com/usr/<ник>` (маркер «Sorry, this user was not found.») |
| 31 | PayPal | Платёжная система (PayPal.Me) | `paypal.com/paypalme/<ник>` |
| 32 | Wikipedia (ru) | Онлайн-энциклопедия | `ru.wikipedia.org/wiki/Участник:<ник>` |
| 33 | HubPages | Платформа для авторских статей | `hubpages.com/@<ник>` |
| 34 | PornHub | Видеохостинг для взрослых | `rt.pornhub.com/users/<ник>` |
| 35 | Archive.is | Архив веб-страниц | `archive.is/search/?text=<ник>` |
| 36 | Flickr | Фотохостинг | `flickr.com/people/<ник>` |
| 37 | SlideShare | Хостинг презентаций и документов | `slideshare.net/<ник>` |
| 38 | FanPop | Фан-сообщества по интересам | `fanpop.com/fans/<ник>` |
| 39 | TenChat | Российская деловая социальная сеть | `tenchat.ru/<ник>` |
| 40 | Buy Me a Coffee | Платформа донатов для авторов | `buymeacoffee.com/<ник>` |
| 41 | 9GAG | Развлекательный сайт с мемами | `9gag.com/u/<ник>` |
| 42 | Last.fm | Музыкальный сервис/трекер прослушиваний | `last.fm/user/<ник>` |
| 43 | EyeEm | Фотохостинг и сообщество фотографов | `eyeem.com/u/<ник>` |
| 44 | Disqus | Система комментариев для сайтов | `disqus.com/by/<ник>` |

Полный и всегда актуальный список формируется в [`src/checkers/registry.ts`](src/checkers/registry.ts) — при желании там же можно посмотреть точную логику проверки для каждого сервиса (по HTTP-статусу, маркеру в контенте страницы или итоговому URL после редиректа).

### Режимы работы

После запуска программа предлагает выбрать режим:

1. **username** — проверить один никнейм, введённый вручную;
2. **usernames list (.txt)** — проверить сразу список никнеймов из текстового файла (по одному нику на строке).

Результат по каждому сервису выводится в консоль в формате:

```
[+] GitHub : https://github.com/example
[-] Steam : NOT FOUND
```

### Требования

- **Node.js версии 18 или новее** (рекомендуется LTS 20.x) — инструмент использует встроенный `fetch`, доступный начиная с Node.js 18.
- **npm** (устанавливается вместе с Node.js).
- **Git** — для клонирования репозитория (можно и без него, скачав ZIP-архив с GitHub).

### Установка

#### 1. Установка Node.js и npm

**Windows:**

- Скачайте и установите LTS-версию с официального сайта: https://nodejs.org (Windows Installer, .msi).
- Либо через `winget` (Windows 10/11) в PowerShell:

```powershell
winget install OpenJS.NodeJS.LTS
```

- Либо через менеджер версий [nvm-windows](https://github.com/coreybutler/nvm-windows):

```powershell
nvm install lts
nvm use lts
```

**Linux (Debian/Ubuntu):**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Либо через [nvm](https://github.com/nvm-sh/nvm) (работает одинаково на любом дистрибутиве):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

Проверьте, что всё установилось:

```bash
node -v
npm -v
```

#### 2. Клонирование репозитория

Одинаково для Windows (PowerShell / cmd) и Linux (bash):

```bash
git clone https://github.com/AlexC-ux/Arina-OSINT-nickname-checker-.git
cd Arina-OSINT-nickname-checker-
```

Если Git не установлен — скачайте ZIP-архив со страницы репозитория на GitHub (кнопка **Code → Download ZIP**) и распакуйте его.

#### 3. Установка зависимостей

```bash
npm install
```

#### 4. Сборка проекта

TypeScript-код нужно скомпилировать в JavaScript:

```bash
npm run build
```

Команда автоматически проверит код линтером (`prebuild`) и соберёт его в папку `dist/`.

#### 5. Запуск

```bash
npm start
```

Команда одинакова на Windows и на Linux. После запуска в консоли появится приглашение выбрать режим (`1` — один никнейм, `2` — список из файла) — далее просто следуйте подсказкам в терминале.

> Для режима "список из файла" подготовьте обычный `.txt` файл с одним никнеймом на строке и укажите путь к нему при запросе (например, `C:\Users\Name\nicknames.txt` на Windows или `/home/name/nicknames.txt` на Linux).

#### Разработка

Для удобной разработки есть режим отслеживания изменений (пересобирает проект при каждом сохранении файла):

```bash
npm run watch
```

Полезные команды:

```bash
npm run lint     # проверка кода ESLint
npm run format   # автоформатирование Prettier
```

### Планы

- [ ] Tinder
- [ ] Roblox
- [ ] Другие сервисы

---

## English

### About the project

**Arina-OSINT** is a console OSINT (Open Source Intelligence) tool for finding accounts registered under a given nickname/username across dozens of popular websites and services. It's handy for finding forgotten/old profiles, auditing the "digital footprint" of a username, or general OSINT investigations.

The project originally was written in C# (.NET Core); the current version is a full behavior-preserving port of the original logic to **TypeScript / Node.js** — all URL templates, content markers and User-Agent strings match the original 1:1.

How it works: for the given username, the tool sequentially queries every supported service (its profile page or public API) and determines whether an account with that name exists, based on the HTTP status code of the response, the presence/absence of a content marker on the page, or the final URL after a redirect.

### Available services

**44 services** are currently supported. For each one, the tool checks whether a page/profile with the given username exists at the listed address:

| # | Service | Description | What's checked |
|---|---------|--------------|-----------------|
| 1 | GitHub | Code hosting and collaborative development | `github.com/<username>` |
| 2 | Steam | Digital video game distribution platform | `steamcommunity.com/id/<username>` |
| 3 | Telegram | Messaging app | `t.me/<username>` |
| 4 | Akniga | Audiobooks website | `akniga.org/profile/<username>` |
| 5 | MySpace | Social network | `myspace.com/<username>` |
| 6 | Blogger | Google's blogging platform | `<username>.blogspot.com` |
| 7 | About.me | Personal bio/landing pages | `about.me/<username>` |
| 8 | Gravatar | Global avatar service | `en.gravatar.com/<username>` |
| 9 | Jimdo | Website builder | `<username>.jimdofree.com` |
| 10 | Tumblr | Blogging/microblogging platform | `<username>.tumblr.com` |
| 11 | WordPress | Blogging and website platform | `<username>.wordpress.com` |
| 12 | Reddit | Forums and news aggregator | `reddit.com/user/<username>` |
| 13 | Pikabu | Russian entertainment/community site | `pikabu.ru/@<username>` |
| 14 | VKontakte (VK) | Social network | `vk.com/<username>` |
| 15 | TikTok | Short-video platform | `tiktok.com/@<username>` |
| 16 | Pinterest | Image/idea boards | `pinterest.com/<username>` |
| 17 | Twitch | Live streaming platform | `twitch.tv/<username>` |
| 18 | YouTube | Video hosting | `youtube.com/user/<username>` |
| 19 | Vimeo | Video hosting | `vimeo.com/<username>` |
| 20 | Facebook | Social network | `facebook.com/<username>` |
| 21 | Habr | IT community and blogging platform | `habr.com/ru/users/<username>` |
| 22 | HabrCareer | IT job search and resume platform | `career.habr.com/<username>` |
| 23 | Patreon | Creator support/donation platform | `patreon.com/<username>` |
| 24 | Spotify | Music streaming | `open.spotify.com/user/<username>` |
| 25 | Yandex Music | Yandex's music streaming service | `music.yandex.ru/users/<username>` |
| 26 | Yandex Market | Yandex's marketplace | `market.yandex.ru/user/<username>` |
| 27 | Dzen | Yandex's blogging/articles platform | `dzen.ru/user/<username>` |
| 28 | Yandex Questions | Yandex's expert Q&A platform (Kyu) | `yandex.ru/q/profile/<username>` |
| 29 | SoundCloud | Music and podcast platform | `soundcloud.com/<username>` |
| 30 | Ebay | Online marketplace/auctions | `ebay.com/usr/<username>` (marker «Sorry, this user was not found.») |
| 31 | PayPal | Payment system (PayPal.Me) | `paypal.com/paypalme/<username>` |
| 32 | Wikipedia (ru) | Online encyclopedia | `ru.wikipedia.org/wiki/Участник:<username>` |
| 33 | HubPages | Platform for author articles | `hubpages.com/@<username>` |
| 34 | PornHub | Adult video hosting | `rt.pornhub.com/users/<username>` |
| 35 | Archive.is | Web page archive | `archive.is/search/?text=<username>` |
| 36 | Flickr | Photo hosting | `flickr.com/people/<username>` |
| 37 | SlideShare | Presentation/document hosting | `slideshare.net/<username>` |
| 38 | FanPop | Fan communities | `fanpop.com/fans/<username>` |
| 39 | TenChat | Russian business social network | `tenchat.ru/<username>` |
| 40 | Buy Me a Coffee | Creator donation platform | `buymeacoffee.com/<username>` |
| 41 | 9GAG | Meme/entertainment site | `9gag.com/u/<username>` |
| 42 | Last.fm | Music service/listening tracker | `last.fm/user/<username>` |
| 43 | EyeEm | Photo hosting and photographer community | `eyeem.com/u/<username>` |
| 44 | Disqus | Comment system for websites | `disqus.com/by/<username>` |

The full, always up-to-date list lives in [`src/checkers/registry.ts`](src/checkers/registry.ts) — it also contains the exact check logic used for each service (HTTP status code, a content marker on the page, or the final URL after a redirect).

### Modes

Once started, the app asks you to pick a mode:

1. **username** — check a single, manually-entered username;
2. **usernames list (.txt)** — check a batch of usernames from a text file (one username per line).

Each service's result is printed to the console as:

```
[+] GitHub : https://github.com/example
[-] Steam : NOT FOUND
```

### Requirements

- **Node.js 18 or newer** (LTS 20.x recommended) — the tool relies on the built-in global `fetch`, available since Node.js 18.
- **npm** (bundled with Node.js).
- **Git** — to clone the repository (optional, you can also download a ZIP from GitHub).

### Installation

#### 1. Install Node.js and npm

**Windows:**

- Download and install the LTS release from the official site: https://nodejs.org (Windows Installer, .msi).
- Or via `winget` (Windows 10/11) in PowerShell:

```powershell
winget install OpenJS.NodeJS.LTS
```

- Or via the [nvm-windows](https://github.com/coreybutler/nvm-windows) version manager:

```powershell
nvm install lts
nvm use lts
```

**Linux (Debian/Ubuntu):**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Or via [nvm](https://github.com/nvm-sh/nvm) (works the same on any distro):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

Verify the installation:

```bash
node -v
npm -v
```

#### 2. Clone the repository

Identical on Windows (PowerShell / cmd) and Linux (bash):

```bash
git clone https://github.com/AlexC-ux/Arina-OSINT-nickname-checker-.git
cd Arina-OSINT-nickname-checker-
```

If Git isn't installed, download a ZIP archive from the repository page on GitHub (**Code → Download ZIP** button) and extract it.

#### 3. Install dependencies

```bash
npm install
```

#### 4. Build the project

The TypeScript source needs to be compiled to JavaScript:

```bash
npm run build
```

This automatically runs the linter first (`prebuild`) and then compiles everything into the `dist/` folder.

#### 5. Run

```bash
npm start
```

The command is identical on Windows and Linux. Once started, the console will prompt you to choose a mode (`1` — single username, `2` — list from a file) — just follow the prompts in the terminal.

> For the "list from a file" mode, prepare a plain `.txt` file with one username per line and provide its path when asked (e.g. `C:\Users\Name\nicknames.txt` on Windows or `/home/name/nicknames.txt` on Linux).

#### Development

For a convenient development loop (rebuilds on every file save):

```bash
npm run watch
```

Other useful commands:

```bash
npm run lint     # run ESLint checks
npm run format   # auto-format with Prettier
```

### Roadmap

- [ ] Tinder
- [ ] Roblox
- [ ] More services
