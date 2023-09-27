/* eslint-disable */
describe('word-wizard/view-child', () => {
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
  });

  it('should load the view-child page', () => {
    cy.url().should('contain', 'view-child');
  });

  it('should navigate to the Library page when the Library button is clicked', () => {
    cy.get('.spellbook').first().click();
    cy.url().should('include', '/library');
  });

  it('should navigate to settings page when the settings button is clicked', () => {
    cy.get('#settings-button').first().click();
    cy.url().should('include', '/settings');
  });
});
