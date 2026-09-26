import SteamStorePage from '../pages/SteamStorePage';

describe('Steam Store Search', () => {

    const steamStore = new SteamStorePage();

    it('should search for Dota 2', () => {

        steamStore.visit();

        steamStore.searchGame('Dota 2');

        steamStore.firstResultName()
            .should('have.text', 'Dota 2');

    });

    it('should extract first game data', () => {

        steamStore.visit();

        steamStore.searchGame('Dota 2');

        cy.get('.search_result_row')
            .first()
            .then((result) => {

                steamStore.getGameData(result)
                    .then((game) => {

                        cy.log(JSON.stringify(game));

                        expect(game.name).to.equal('Dota 2');
                        expect(game.platforms).to.deep.equal([
                            'Windows',
                            'macOS',
                            'Linux'
                        ]);
                        expect(game.releaseDate).to.equal('9 Jul, 2013');
                        expect(game.review).to.equal('Very Positive');
                        expect(game.price).to.equal('Free');

                    });

            });

    });

    it('should extract first two games', () => {

    steamStore.visit();

    steamStore.searchGame('Dota 2');

    steamStore.searchResults()
        .then((results) => {

            const firstResult = results.eq(0);
            const secondResult = results.eq(1);

            steamStore.getGameData(firstResult)
                .then((game1) => {

                    steamStore.getGameData(secondResult)
                        .then((game2) => {

                            cy.log(JSON.stringify(game1));
                            cy.log(JSON.stringify(game2));

                        });

                });

        });

});

});