/* eslint-disable */

describe('word-wizard/add-child', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('/');

    cy.url().then((url) => {
      if (url.includes('welcome')) {
        cy.get('ion-button').click();
      }
    });

    cy.get('input#name').type(Cypress.env('auth_username'));
    cy.get('input#age').type(Cypress.env('auth_password'), { log: false });
    cy.get('#login-button').click({ force: true });

    cy.get('button.circle').last().click();
  });

  it('should go to add child page', () => {
    cy.url().should('equal', 'http://localhost:4200/add-child');
  });

  it('should select a profile picture', () => {
    cy.get('.add-picture').click();
    cy.get('.overlay').should('be.visible');

    cy.get('.img-item').first().click({ force: true });

    cy.get('#close-modal').click({ force: true });

    cy.get('.overlay').should('not.be.visible');
  });
});
