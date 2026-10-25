// Entry point: the passcode screen (if one is set up), then the app.
import { passGate } from './gate.js';

await passGate();
await import('./app.js');
