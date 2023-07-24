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

  it('should display the Reading Page with the correct header', () => {
    cy.visit('/reading');
    cy.get('ww-header').should('contain', 'Journeyman');
    cy.get('ww-header').should('have.attr', 'ng-reflect-settings-active', 'true');
    cy.get('ww-header').should('have.attr', 'ng-reflect-back-route', './');
  });





});
