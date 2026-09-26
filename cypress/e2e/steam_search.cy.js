import SteamStorePage from '../pages/SteamStorePage';

describe('Steam Store Search and Verification', () => {

    const steamStore = new SteamStorePage();


    // --------------------------------------------------
    // Step 1-2: Search Dota 2 and verify first result
    // --------------------------------------------------

    it('should search for Dota 2 and verify the first result', () => {

        steamStore.visit();

        steamStore.searchGame('Dota 2');

        steamStore.firstResultName()
            .should('equal', 'Dota 2');

    });


    // --------------------------------------------------
    // Step 3-4: Extract and store first two games
    // --------------------------------------------------

    it('should store the first two search results', () => {

        steamStore.visit();

        steamStore.searchGame('Dota 2');

        steamStore.getFirstTwoGames()
            .then(({ game1, game2 }) => {

                // Make sure both objects contain all required fields.

                expect(game1).to.have.all.keys(
                    'name',
                    'platforms',
                    'releaseDate',
                    'review',
                    'price'
                );

                expect(game2).to.have.all.keys(
                    'name',
                    'platforms',
                    'releaseDate',
                    'review',
                    'price'
                );

                // First result must be Dota 2.

                expect(game1.name)
                    .to.equal('Dota 2');

                // Second result must have a valid name.

                expect(game2.name)
                    .to.be.a('string')
                    .and.not.be.empty;

                cy.log(`First game: ${JSON.stringify(game1)}`);
                cy.log(`Second game: ${JSON.stringify(game2)}`);

            });

    });


    // --------------------------------------------------
    // Step 5-6: Search using second game and compare
    // --------------------------------------------------

    it('should re-search using the second game name and verify both games', () => {

        // First search

        steamStore.visit();

        steamStore.searchGame('Dota 2');


        // Extract original first two games

        steamStore.getFirstTwoGames()
            .then(({ game1, game2 }) => {

                cy.log(`Original Game 1: ${JSON.stringify(game1)}`);
                cy.log(`Original Game 2: ${JSON.stringify(game2)}`);


                // ------------------------------------------
                // Search again using second game's name
                // ------------------------------------------

                steamStore.searchGame(game2.name);


                // ------------------------------------------
                // Verify search box
                // ------------------------------------------

                steamStore.searchBox()
                    .should('have.value', game2.name);


                // ------------------------------------------
                // Verify both games exist
                // ------------------------------------------

                steamStore.findResultByName(game1.name)
                    .should('exist');

                steamStore.findResultByName(game2.name)
                    .should('exist');


                // ------------------------------------------
                // Extract Game 1 again
                // ------------------------------------------

                steamStore.getGameByName(game1.name)
                    .then((newGame1) => {


                        // ----------------------------------
                        // Extract Game 2 again
                        // ----------------------------------

                        steamStore.getGameByName(game2.name)
                            .then((newGame2) => {


                                // ==================================
                                // Compare Game 1
                                // ==================================

                                expect(newGame1.name)
                                    .to.equal(game1.name);

                                expect(newGame1.platforms)
                                    .to.deep.equal(game1.platforms);

                                expect(newGame1.releaseDate)
                                    .to.equal(game1.releaseDate);

                                expect(newGame1.review)
                                    .to.equal(game1.review);

                                expect(newGame1.price)
                                    .to.equal(game1.price);


                                // ==================================
                                // Compare Game 2
                                // ==================================

                                expect(newGame2.name)
                                    .to.equal(game2.name);

                                expect(newGame2.platforms)
                                    .to.deep.equal(game2.platforms);

                                expect(newGame2.releaseDate)
                                    .to.equal(game2.releaseDate);

                                expect(newGame2.review)
                                    .to.equal(game2.review);

                                expect(newGame2.price)
                                    .to.equal(game2.price);


                                // ==================================
                                // Final log
                                // ==================================

                                cy.log('Game 1 comparison passed');
                                cy.log('Game 2 comparison passed');

                            });

                    });

            });

    });

});