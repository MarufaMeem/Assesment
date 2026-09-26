const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
     baseUrl: "https://store.steampowered.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      video: true
  },
});
