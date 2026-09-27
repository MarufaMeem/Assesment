const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://store.steampowered.com",

        setupNodeEvents(on, config) {
            // Node event listeners can be added here when needed.
        },

        video: true
    }
});