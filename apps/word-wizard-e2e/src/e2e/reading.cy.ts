/* eslint-disable */

describe('word-wizard/reading', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/');

    cy.get('ion-button').click();
    cy.get('input#username').type(Cypress.env('auth_username'));
    cy.get('input#password').type(Cypress.env('auth_password'), {log: false});
    cy.contains('button', 'Continue').click({force: true});
    cy.url().should('equal', 'http://localhost:4200/welcome');

  });

  it('should load the reading page', () => {
    cy.visit('/reading');
  });



});
