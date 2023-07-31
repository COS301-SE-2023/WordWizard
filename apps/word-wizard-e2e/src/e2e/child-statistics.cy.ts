/* eslint-disable */
describe('word-wizard/child-statistics', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/');

    cy.url().then((url) => {
      if(url.includes('welcome')) {
        cy.get('ion-button').click();
      }
    });

    cy.get('input#username').type(Cypress.env('auth_username'));
    cy.get('input#password').type(Cypress.env('auth_password'), {log: false});
    cy.contains('button', 'Continue').click({force: true});

    cy.get('button').then(($btn) => {
      if ($btn.text() === 'Accept') {
        cy.get('button').contains('Accept').click();
      }
    });

  });

it('should select a child, redirect to view-child, go to child statistics and view one', () => {
  cy.visit('/manage-children');
  cy.get('.circle').first().click();

  cy.url().then((url) => {
    if(url.includes('add-child')) {
      cy.log('no existing children');
    } else {
      cy.get('.overlay').should('be.visible');
      cy.get('.continueParent').click();
      cy.url().should('equal', 'http://localhost:4200/view-child');

      cy.get('.stats').first().click();
      cy.url().should('equal', 'http://localhost:4200/child-statistics');

    }
  });

  });
});
