/* eslint-disable */

describe('word-wizard/manage-children', () => {
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

    cy.wait(5000);
  });

  it('should load manage-children', () => {
    cy.url().should('equal', 'http://localhost:4200/manage-children');
  });

  it('should load children', () => {
    cy.get('.circle').should('exist');
  });

  it('should redirect to add-child', () => {
    cy.get('.circle').last().click();
    cy.url().should('equal', 'http://localhost:4200/add-child');
  });
});
