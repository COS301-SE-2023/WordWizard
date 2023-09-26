/* eslint-disable */

describe('login', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('/');
  });




  it('should complete login with Auth0', () => {
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

    cy.url().should('equal', 'http://localhost:4200/manage-children');
  });
});
