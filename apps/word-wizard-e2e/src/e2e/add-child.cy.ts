/* eslint-disable */

describe('word-wizard/add-child', () => {
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

  it('should redirect to add-child from manage-children', () => {
    cy.visit('/manage-children');
    cy.get('button').last().click();
    cy.url().should('equal', 'http://localhost:4200/add-child');

    cy.get('.add-picture').click();
    cy.get('.overlay').should('be.visible');

    cy.get('.img-item').first().click({force:true});

    cy.window().its('controlModal').then((controlModal) => {
      controlModal();
    });

    cy.get('.overlay').should('not.be.visible');

    cy.get('input name').type('test');
    cy.get('input #age').type('5');

    cy.get('.submit-btn').click();

    cy.url().should('equal', 'http://localhost:4200/manage-children');

    cy.get('ion-row').its('length').then((length) => {
      if (length >= 2) {
        cy.get('.list-item').eq(length - 2).then((secondToLastElement) => {
          cy.wrap(secondToLastElement).find('.child-name').should('contain', 'test');
        });
      } else {
        cy.log('There are not enough elements to get the second-to-last element.');
      }
    });


  });

});
