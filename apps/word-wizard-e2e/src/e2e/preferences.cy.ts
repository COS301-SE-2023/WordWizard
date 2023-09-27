/* eslint-disable */

describe('Preferences', () => {
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
    cy.get('.continueParent').first().click();
    cy.get('#otp1').type('1');
    cy.get('#otp2').type('2');
    cy.get('#otp3').type('3');
    cy.get('#otp4').type('4');
    cy.get('.trophy').last().click();
    cy.url().should('equal', 'http://localhost:4200/preferences');
  });

  it('should be in preferences', () => {
    cy.url().should('equal', 'http://localhost:4200/preferences');
  });

  it('should select a preference', () => {
    cy.wait(2000);
    cy.get('.op-chip').last().click();
    cy.wait(3000);
    cy.get('ion-icon.close').last().click();
  });

  it('should select a preference and save it', () => {
    cy.wait(2000);
    cy.get('.op-chip').first().click();
    cy.get('.btn-tpc').first().click();
  });

  it('Should remove a preference and save it', () => {
    cy.wait(2000);
    cy.get('ion-icon.close').last().click();
    cy.get('.btn-tpc').first().click();
  });
});
