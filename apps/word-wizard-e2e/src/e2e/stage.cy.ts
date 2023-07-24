/* eslint-disable */

describe('word-wizard/stage', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/');
  });

  it('should complete login with Auth0', () => {
    cy.get('ion-button').click();

    cy.get('input#username').type(Cypress.env('auth_username'));
    cy.get('input#password').type(Cypress.env('auth_password'), {log: false});
    cy.contains('button', 'Continue').click({force: true});

    /*
    uncomment for first time login
    cy.contains('button', 'Accept').click({force: true});
    */

    cy.url().should('equal', 'http://localhost:4200/welcome');
  });



  it('should display the header title', () => {
    cy.visit('/stage');
    cy.get('.ww-header-title').should('contain', 'Stages');
  });

  // it('should display 20 coins', () => {
  //   cy.get('.ww-lesson-coin')
  //     .find('.coin')
  //     .should('have.length', 20);
  // });

});
