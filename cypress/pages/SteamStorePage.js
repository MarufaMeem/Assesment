class SteamStorePage {


    visit() {
        cy.visit('/');
    }


   
    searchBox() {
        return cy.get('input[name="term"]:visible').first();
    }

    searchGame(gameName) {
        this.searchBox()
            .should('be.visible')
            .clear()
            .type(`${gameName}{enter}`);

        cy.url().should('include', 'search');
    }

    searchGameByUrl(gameName) {
        cy.visit(`/search?term=${encodeURIComponent(gameName)}`);

        cy.url()
            .should('include', `term=${encodeURIComponent(gameName)}`);
    }


 
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


   
    getGameData(result) {

        const game = {};

        game.name = result
            .find('.search_name .title')
            .text()
            .trim();

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

        game.releaseDate = result
            .find('.search_released')
            .text()
            .trim();

        game.price = result
            .find('.discount_final_price')
            .text()
            .trim();

        return cy.wrap(result)
            .find('.search_review_summary')
            .invoke('attr', 'data-tooltip-html')
            .then((reviewText) => {

                game.review = reviewText
                    .replace(/&lt;br&gt;/g, '<br>')
                    .split('<br>')[0]
                    .trim();

                return game;
            });
    }


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



    getGameByName(gameName) {

        return this.findResultByName(gameName)
            .should('exist')
            .then((result) => {

                return this.getGameData(result);

            });
    }

}

export default SteamStorePage;