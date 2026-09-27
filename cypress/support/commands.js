Cypress.Commands.add("searchSteam", (gameName) => {
    cy.visit(`/search?term=${encodeURIComponent(gameName)}`);

    cy.get('input[name="term"]:visible')
        .first()
        .should("be.visible")
        .clear()
        .type(gameName)
        .should("have.value", gameName);
});