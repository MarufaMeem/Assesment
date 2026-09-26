# MISL SQA Automation Assessment

## Objective
Automated test suite for Steam Store search, data extraction, and
verification, built with Cypress following the Page Object Model.

## Technology
- Cypress 16.1.0
- JavaScript
- Node.js

## Project Structure
```
cypress/
  e2e/
    steam_search.cy.js     # Test spec (all 3 test cases)
  pages/
    SteamStorePage.js       # Page Object with all locators and actions
  fixtures/                 # (not used — data is stored in JS objects)
  support/
    commands.js
    e2e.js
cypress.config.js
package.json
```

## Setup
```
npm install
```

## Run Cypress (interactive)
```
npx cypress open
```

## Run headless
```
npx cypress run
```

## Cypress Version
16.1.0

## Test Scenario
1. Open Steam Store homepage
2. Search "Dota 2"
3. Verify search results page is displayed, search box contains "Dota 2",
   and the first result name exactly matches "Dota 2"
4. Extract and store name, platforms, release date, review summary, and
   price for the first two search results (as in-memory JS objects)
5. Re-search using the second stored game's name
6. Verify the search box, both games' presence in the result list, and
   that all stored fields match exactly on re-extraction