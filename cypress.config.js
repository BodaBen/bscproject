const { defineConfig } = require('cypress');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    baseUrl: getBaseUrlFromEnv(), // ez olvassa be a cypress.env.json fájlból
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});

// Helper függvény az env fájl olvasásához
function getBaseUrlFromEnv() {
  try {
    const env = JSON.parse(fs.readFileSync('cypress.env.json'));
    return env.baseUrl || 'http://localhost:3000'; // fallback, ha nincs megadva
  } catch (err) {
    console.warn('Nem található vagy hibás a cypress.env.json fájl. Alapértelmezett baseUrl lesz használva.');
    return 'http://localhost:3000';
  }
}