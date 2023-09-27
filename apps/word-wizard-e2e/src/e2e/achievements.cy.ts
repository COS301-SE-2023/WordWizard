/* eslint-disable */

describe('word-wizard/achievements', () => {
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
  });

  //select a child first to get to the achievements page
  it('should select a child, redirect to dashboard, go to achievements and view one', () => {
    cy.visit('/manage-children');
    cy.get('.circle').first().click();

    cy.url().then((url) => {
      if (url.includes('add-child')) {
        cy.log('no existing children');
      } else {
        cy.get('.overlay').should('be.visible');
        cy.get('.continueChild').click();
        cy.url().should('equal', 'http://localhost:4200/dashboard');

        cy.get('.trophy').first().click();
        cy.url().should('equal', 'http://localhost:4200/achievements');

        cy.get('.award-item').first().click();

        cy.get('ww-modal').should(
          'have.attr',
          'ng-reflect-is-modal-open',
          'true',
        );
        cy.get('button').first().click({ force: true });
        cy.get('ww-modal').should('not.be.visible');
      }
    });
  });
});
