# Foldwise (web)

The Foldwise magic tricks as a private web app, for the owner and friends: everything unlocked, no
store, no purchases. It looks exactly like the iPhone Notes app (name and icon included), so it can
be added to the home screen as a disguise. The store apps live in the
[DFB](https://github.com/YuvalOfek1/DFB) repo; this repo is a copy of their web code.

**Site:** https://yuvalofek1.github.io/DFB-WEB/

## Setup (once)

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Secrets and variables → Actions → New repository secret:** `WEB_PASSCODE` with the
   passcode friends will type (digits work best: the phone shows the number pad).
3. **Actions → Deploy to GitHub Pages → Run workflow** (later pushes to `main` deploy by themselves).

The passcode screen keeps casual visitors out, and each browser remembers it once entered. It is
not real security: the site's files are public. Without the secret there is no passcode screen.

## Using it

Open the site in Safari, then Share → **Add to Home Screen**. It opens full screen and works
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
