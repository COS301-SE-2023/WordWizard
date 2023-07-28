/* eslint-disable */
describe('word-wizard/dashboard', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/');

    cy.get('ion-button').click();
    cy.get('input#username').type(Cypress.env('auth_username'));
    cy.get('input#password').type(Cypress.env('auth_password'), {log: false});
    cy.contains('button', 'Continue').click({force: true});
    cy.url().should('equal', 'http://localhost:4200/welcome');

  });

  it('should load the dashboard page', () => {
    cy.visit('/dashboard');
  });

  it('should open the image picker modal when the profile photo is clicked', () => {
    cy.visit('/dashboard');
    cy.get('.pfp ion-avatar').click();
    cy.get('.overlay').should('be.visible');
  });

  it('should close the image picker modal when the close icon is clicked', () => {
    cy.visit('/dashboard');
    cy.get('.pfp ion-avatar').click();
    cy.get('.overlay').should('be.visible');

    cy.get('.close-icon').click();
    cy.get('.overlay').should('not.be.visible');
  });

  it('should change the profile image when a new PFP is picked on the modal', () => {
    cy.visit('/dashboard');

    cy.get('.pfp ion-avatar').click();
    cy.get('.overlay').should('be.visible');

    cy.get('.img-item').first().click();
    cy.get('.overlay').should('not.be.visible');

    cy.get('.pfp ion-avatar img').should('have.attr', 'src').should('not.be.empty');
  });


  it('should navigate to the Library page when the Library button is clicked', () => {
    cy.visit('/dashboard');
    cy.get('.spellbook').click();
    cy.url().should('include', '/library');
  });

  // it('should navigate to the Badges page when the Badges button is clicked', () => {
  //   cy.visit('/dashboard');
  //   cy.get('.trophy').click();
  //   cy.url().should('include', '/badges');
  // });

  it('should navigate to the Levels page when the Levels button is clicked', () => {
    cy.visit('/dashboard');
    cy.get('.map').click();
    cy.url().should('include', '/stage');
  });

});