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

Всего поддерживается **42 сервиса**:

| # | Сервис | # | Сервис | # | Сервис |
|---|--------|---|--------|---|--------|
| 1 | GitHub | 15 | TikTok | 29 | PayPal |
| 2 | Steam | 16 | Pinterest | 30 | Wikipedia |
| 3 | Telegram | 17 | Twitch | 31 | HubPages |
| 4 | Akniga | 18 | YouTube | 32 | PornHub |
| 5 | MySpace | 19 | Vimeo | 33 | Archive.is |
| 6 | Blogger | 20 | Facebook | 34 | Flickr |
| 7 | About.me | 21 | Habr | 35 | SlideShare |
| 8 | Gravatar | 22 | Patreon | 36 | FanPop |
| 9 | Jimdo | 23 | Spotify | 37 | TenChat |
| 10 | Tumblr | 24 | Yandex Music | 38 | Buy Me a Coffee |
| 11 | WordPress | 25 | Yandex Market | 39 | 9GAG |
| 12 | Reddit | 26 | Yandex Zen | 40 | Last.fm |
| 13 | Pikabu | 27 | SoundCloud | 41 | EyeEm |
| 14 | ВКонтакте (VK) | 28 | Ebay | 42 | Disqus |

Полный и всегда актуальный список формируется в [`src/checkers/registry.ts`](src/checkers/registry.ts).

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

**42 services** are currently supported:

| # | Service | # | Service | # | Service |
|---|---------|---|---------|---|---------|
| 1 | GitHub | 15 | TikTok | 29 | PayPal |
| 2 | Steam | 16 | Pinterest | 30 | Wikipedia |
| 3 | Telegram | 17 | Twitch | 31 | HubPages |
| 4 | Akniga | 18 | YouTube | 32 | PornHub |
| 5 | MySpace | 19 | Vimeo | 33 | Archive.is |
| 6 | Blogger | 20 | Facebook | 34 | Flickr |
| 7 | About.me | 21 | Habr | 35 | SlideShare |
| 8 | Gravatar | 22 | Patreon | 36 | FanPop |
| 9 | Jimdo | 23 | Spotify | 37 | TenChat |
| 10 | Tumblr | 24 | Yandex Music | 38 | Buy Me a Coffee |
| 11 | WordPress | 25 | Yandex Market | 39 | 9GAG |
| 12 | Reddit | 26 | Yandex Zen | 40 | Last.fm |
| 13 | Pikabu | 27 | SoundCloud | 41 | EyeEm |
| 14 | VKontakte (VK) | 28 | Ebay | 42 | Disqus |

The full, always up-to-date list lives in [`src/checkers/registry.ts`](src/checkers/registry.ts).

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
