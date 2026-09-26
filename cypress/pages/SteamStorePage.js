class SteamStorePage {

    visit() {
        cy.visit('https://store.steampowered.com/');
    }

    searchBox() {
        return cy.get('input[name="term"]');
    }

    searchGame(gameName) {
        this.searchBox()
            .should('be.visible')
            .clear()
            .type(`${gameName}{enter}`);
    }

    firstResult() {
        return cy.get('.search_result_row').first();
    }

    firstResultName() {
        return this.firstResult()
            .find('.search_name .title');
    }
searchResults() {
    return cy.get('.search_result_row');
}
 getGameData(result) {

    const game = {};

    game.name = result.find('.search_name .title').text().trim();

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

    game.releaseDate = result.find('.search_released').text().trim();

    game.price = result.find('.discount_final_price').text().trim();

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

}

export default SteamStorePage;

