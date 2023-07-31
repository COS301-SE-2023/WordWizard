/* eslint-disable */

describe('word-wizard/manage-children', () => {
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

  it('should visit manage-children', () => {
    cy.visit('/manage-children');
    cy.url().should('equal', 'http://localhost:4200/manage-children');
  });

  it('should select a child and redirect to dashboard', () => {
    cy.visit('/manage-children');
    cy.get('.circle').first().click();

    cy.get('.overlay').should('be.visible');
    cy.get('.continueChild').click();
    cy.url().should('equal', 'http://localhost:4200/dashboard');

  });

  it('should redirect to add-child', () => {
    cy.visit('/manage-children');
    cy.get('button').last().click();
    cy.url().should('equal', 'http://localhost:4200/add-child');
  });


});
