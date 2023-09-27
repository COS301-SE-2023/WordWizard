/* eslint-disable */

describe('word-wizard/library', () => {
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
    cy.get('#otp1').type('1');
    cy.get('#otp2').type('2');
    cy.get('#otp3').type('3');
    cy.get('#otp4').type('4');

    cy.get('a.spellbook').first().click();
  });

  it('should visit the library page', () => {
    cy.url().should('equal', 'http://localhost:4200/library');
  });

  it('should display the header title', () => {
    cy.get('ion-title').should('contain', 'Library');
  });

  it('should load the scrolls', () => {
    cy.get('.scroll-closed').should('exist');
  });

  it('should open a scroll', () => {
    cy.get('.scroll-closed').first().click();
    cy.get('.open-scroll-content').should('exist');
  });

  it('should open practice list and load cauldrons', () => {
    cy.get('ion-segment-button').last().click();
    cy.get('ww-cauldron').should('exist');
  });
});
