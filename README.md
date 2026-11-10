# Foldwise (web)

The Foldwise magic tricks as a private web app, for the owner and friends: everything unlocked, no
store, no purchases. It copies the phone's own notes app, name and icon included, so it can be added
to the home screen as a disguise: **iPhone Notes** on iPhone, **Samsung Notes** (One UI 7, Galaxy S25)
on Android. Add `?skin=samsung` or `?skin=ios` to the address to force one (remembered by the
browser), for example to preview the Android look on an iPhone. The store apps live in the
[foldwise](https://github.com/YuvalOfek1/foldwise-app) repo; this repo is a copy of their web code.

**Site:** https://yuvalofek1.github.io/TRICK-WEB/

## Setup (once)

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Secrets and variables → Actions → New repository secret:** `WEB_PASSCODE` with the
   passcode friends will type (digits work best: the phone shows the number pad).
3. **Actions → Deploy to GitHub Pages → Run workflow** (later pushes to `main` deploy by themselves).

The passcode screen keeps casual visitors out, and each browser remembers it once entered. It is
not real security: the site's files are public. Without the secret there is no passcode screen.

## Using it

On iPhone open the site in Safari, then Share → **Add to Home Screen**. On Android open it in
Chrome, then ⋮ → **Add to Home screen** / **Install app** (it installs as "Samsung Notes"). It opens full screen and works
offline. Long-press the big "Notes" title to open Setup: lists, force words, language, how to
perform.

## Development

```sh
npm install
npm test                         # unit tests (force logic, settings, translations)
npm start                        # build www/ and serve it on http://localhost:8080
WEB_PASSCODE=1234 npm run build  # build with the passcode screen
```

- `js/main.js`: entry point (passcode screen, then the app)
- `js/gate.js`: the passcode screen
- `js/purchases.js`: stand-in for the store apps' purchases module; always unlocked
- `js/app.js`, `js/setup.js`, `js/force.js`, `js/store.js`, `js/lists.js`, `js/locales/`: the same
  code as the store apps
- `scripts/lists_data.py` → `python3 scripts/build_lists.py` → `js/lists.js`: built-in lists
