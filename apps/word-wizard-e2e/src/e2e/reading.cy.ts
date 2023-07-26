/* eslint-disable */

describe('word-wizard/reading', () => {
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

  it('should load the reading page', () => {
    cy.visit('/reading');
  });

  it('should display the Reading Page with the correct header', () => {
    cy.visit('/reading');
    cy.get('ww-header').should('contain', 'Journeyman');
    cy.get('ww-header').should('have.attr', 'ng-reflect-settings-active', 'true');
    cy.get('ww-header').should('have.attr', 'ng-reflect-back-route', './');
  });





});
