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

    cy.wait(5000);
    cy.get('button.circle').first().click();
    cy.get('.continueChild').first().click();
    cy.get("#otp1").type('1');
    cy.get("#otp2").type('2');
    cy.get("#otp3").type('3');
    cy.get("#otp4").type('4');
  });

  //select a child first to get to the achievements page
it('should select a child, redirect to dashboard, go to achievements and view one', () => {

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
    });
  });
