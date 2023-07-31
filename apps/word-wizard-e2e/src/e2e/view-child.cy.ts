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

    cy.get('input#username').type(Cypress.env('auth_username'));
    cy.get('input#password').type(Cypress.env('auth_password'), { log: false });
    cy.contains('button', 'Continue').click({ force: true });

    cy.get('button').then(($btn) => {
      if ($btn.text() === 'Accept') {
        cy.get('button').contains('Accept').click();
      }
    });

    // cy.visit('/manage-children');
    // cy.get('button').last().click();
    // cy.url().should('equal', 'http://localhost:4200/add-child');

    // cy.get('.add-picture').click();
    // cy.get('.overlay').should('be.visible');

    // cy.get('.img-item').first().click({force:true});

    // cy.get('#close-modal').click({force:true});

    // cy.get('.overlay').should('not.be.visible');

    // cy.get('#name').type('test');
    // cy.get('#age').type('5');

    // cy.get('.submit-btn').click();
    // cy.url().should('equal', 'http://localhost:4200/manage-children');

    cy.visit('/manage-children');
    cy.get('.circle').first().click();

    cy.url().then((url) => {
      if (url.includes('add-child')) {
        cy.log('no existing children');
      } else {
        cy.get('.overlay').should('be.visible');
        cy.get('.continueParent').click();
        cy.url().should('equal', 'http://localhost:4200/view-child');
      }
    });
  });

  it('should load the childs pfp, load the childs name, load the childs current stage', () => {
    cy.get('.pfp').find('img').should('be.visible');
    cy.get('.name').find('p').should('contain', 'Test');
    cy.get('.stage').contains('Stage');
  });
});
