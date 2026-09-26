class SteamStorePage {

    // -------------------------
    // Navigation
    // -------------------------

    visit() {
        cy.visit('/');
    }


    // -------------------------
    // Search
    // -------------------------

    searchBox() {
        return cy.get('input[name="term"]:visible').first();
    }

    searchGame(gameName) {
        // Open the actual Steam search URL.
        cy.visit(`/search?term=${encodeURIComponent(gameName)}`);

        // Steam does not populate the visible search input after navigation,
        // so enter the searched term into the visible input.
        this.searchBox()
            .should('be.visible')
            .clear()
            .type(gameName);

        this.searchBox()
            .should('have.value', gameName);
    }


    // -------------------------
    // Search Results
    // -------------------------

    searchResults() {
        return cy.get('.search_result_row');
    }

    firstResult() {
        return this.searchResults().first();
    }

    firstResultName() {
        return this.firstResult()
            .find('.search_name .title')
            .invoke('text')
            .then((text) => text.trim());
    }


    // -------------------------
    // Extract Game Data
    // -------------------------

    getGameData(result) {

        const game = {};

        // Name
        game.name = result
            .find('.search_name .title')
            .text()
            .trim();

        // Platforms
        game.platforms = [];

        if (result.find('.platform_img.win').length > 0) {
            game.platforms.push('Windows');
        }

        if (result.find('.platform_img.mac').length > 0) {
            game.platforms.push('macOS');
        }

        if (result.find('.platform_img.linux').length > 0) {
            game.platforms.push('Linux');
        }

        // Release date
        game.releaseDate = result
            .find('.search_released')
            .text()
            .trim();

        // Price
        game.price = result
            .find('.discount_final_price')
            .text()
            .trim();

        // Review
        return cy.wrap(result)
            .find('.search_review_summary')
            .invoke('attr', 'data-tooltip-html')
            .then((reviewText) => {

                game.review = reviewText
                    ? reviewText
                        .replace(/&lt;br&gt;/g, '<br>')
                        .split('<br>')[0]
                        .trim()
                    : '';

                return game;
            });
    }


    // -------------------------
    // First Two Games
    // -------------------------

    getFirstTwoGames() {

        return this.searchResults()
            .should('have.length.at.least', 2)
            .then((results) => {

                const firstResult = results.eq(0);
                const secondResult = results.eq(1);

                return this.getGameData(firstResult)
                    .then((game1) => {

                        return this.getGameData(secondResult)
                            .then((game2) => {

                                return {
                                    game1,
                                    game2
                                };

                            });

                    });

            });
    }


    // -------------------------
    // Find Result By Name
    // -------------------------

    findResultByName(gameName) {

        return this.searchResults()
            .filter((index, element) => {

                return Cypress.$(element)
                    .find('.search_name .title')
                    .text()
                    .trim() === gameName;

            })
            .first();
    }


    // -------------------------
    // Get Game By Name
    // -------------------------

    getGameByName(gameName) {

        return this.findResultByName(gameName)
            .should('exist')
            .then((result) => {

                return this.getGameData(result);

            });
    }

}

export default SteamStorePage;