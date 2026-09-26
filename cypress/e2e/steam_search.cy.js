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

});