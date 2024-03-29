/* eslint-disable */
describe('word-wizard/dashboard', () => {
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
  });

  it('should load the dashboard page', () => {
    cy.url().should('contain', 'dashboard');
  });

  it('should open the image picker modal when the profile photo is clicked', () => {
    cy.get('.pfp').click();
    cy.get('.overlay').should('be.visible');
  });

  it('should change the profile image when a new PFP is picked on the modal', () => {
    cy.get('.pfp').click();
    cy.get('.overlay').should('be.visible');

    cy.get('.img-item').first().click();
    cy.get('.overlay').should('not.be.visible');

    cy.get('.pfp img').should('have.attr', 'src').should('not.be.empty');
  });

  it('should navigate to the Library page when the Library button is clicked', () => {
    cy.get('.spellbook').click();
    cy.url().should('include', '/library');
  });

  it('should navigate to the Badges page when the Badges button is clicked', () => {
    cy.get('.trophy').click();
    cy.url().should('include', '/achievements');
  });

  it('should navigate to the Levels page when the Levels button is clicked', () => {
    cy.get('.map').click();
    cy.url().should('include', '/stage');
  });
});
