import { BrowserWindow, BrowserView } from 'electrobun/bun';
import Electrobun from 'electrobun/bun';

// Create main window
const mainWindow = new BrowserWindow({
  title: 'EM Medkitt',
  url: 'views://main/index.html',
  width: 1200,
  height: 800,
  minWidth: 900,
  minHeight: 600,
  center: true,
});

// Handle app events
Electrobun.events.on('before-quit', (e) => {
  // Allow app to quit
  e.data.allow = true;
});

// Log for debugging
console.log('EM Medkitt started');
