/* eslint-disable */

describe('word-wizard/reading', () => {
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
    cy.get('button.circle').first().click();
    cy.get('.continueChild').first().click();
    cy.get("#otp1").type('1');
    cy.get("#otp2").type('2');
    cy.get("#otp3").type('3');
    cy.get("#otp4").type('4');
    cy.get(".map").last().click();
  });

  it('should load the reading page', () => {
    cy.get('#coin').first().click();
    cy.url().should('equal', 'http://localhost:4200/reading');
    cy.get('ion-title').should('contain', 'Reading Page');
  });
});
