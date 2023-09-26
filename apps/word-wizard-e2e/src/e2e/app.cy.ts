/* eslint-disable */

describe('login', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('/');

    cy.url().then((url) => {
      if (url.includes('welcome')) {
        cy.get('ion-button').click();
      }
    });
  });


  it('should navigate to Forgot Password', () => {
    cy.get('#forgot-password').click();
    cy.url().should('include', 'forgot-password');
  });

  it('should navigate to SignUp', () => {
    cy.get('#sign-up').click();
    cy.url().should('include', 'sign-up');
  });

  it('should complete login', () => {

    cy.get('input#name').type(Cypress.env('auth_username'));
    cy.get('input#age').type(Cypress.env('auth_password'), { log: false });
    cy.get('#login-button').click({ force: true });

    cy.url().should('equal', 'http://localhost:4200/manage-children');
  });
});
