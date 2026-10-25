// Optional passcode screen, so only people you give the passcode to can use this site. The build
// bakes in a hash of the WEB_PASSCODE secret (never the passcode itself); with no secret there is
// no gate. Once entered, the browser remembers it. It keeps casual visitors out; it isn't real
// security, since the site's files are public.
/* global __PASSCODE_HASH__ */
const HASH = typeof __PASSCODE_HASH__ === 'string' ? __PASSCODE_HASH__ : '';
const KEY = 'foldwise.passcode';

async function sha256(text) {
  const bytes = new TextEncoder().encode(`foldwise:${text}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function remembered() {
  try {
    return localStorage.getItem(KEY) === HASH;
  } catch {
    return false;
  }
}

// Resolves once the right passcode has been entered (at once if there is no gate or it's remembered).
export function passGate() {
  if (!HASH || remembered()) return Promise.resolve();
  return new Promise((resolve) => {
    const form = document.createElement('form');
    form.className = 'gate';
    form.innerHTML = `
      <div class="gate-box">
        <h1>Enter passcode</h1>
        <input type="password" inputmode="numeric" autocomplete="current-password" autofocus aria-label="Passcode">
        <p class="gate-error" hidden>Wrong passcode.</p>
        <button type="submit">Open</button>
      </div>`;
    const input = form.querySelector('input');
    const error = form.querySelector('.gate-error');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (await sha256(input.value.trim()) !== HASH) {
        error.hidden = false;
        input.select();
        return;
      }
      try {
        localStorage.setItem(KEY, HASH);
      } catch { /* asked again next time */ }
      form.remove();
      resolve();
    });
    document.body.append(form);
    input.focus();
  });
}
