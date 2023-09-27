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
    });

    it('should visit manage-children', () => {
        cy.visit('/manage-children');
        cy.url().should('equal', 'http://localhost:4200/manage-children');
    });
    
    // it('should select a child and redirect to dashboard', () => {
    //     cy.get('.circle')
    //     .first()
    //     .then(($btn) => {
    //         if ($btn.text() === 'Add Child') {
    //         cy.log('no existing children');
    //         } else {
    //         cy.visit('/manage-children');
    //         cy.get('.circle').first().click();
    
    //         cy.get('.overlay').should('be.visible');
    //         cy.get('.continueChild').click();
    //         cy.url().should('equal', 'http://localhost:4200/dashboard');
    //         }
    //     });
    // });
    
    // it('should redirect to add-child', () => {
    //     cy.visit('/manage-children');
    //     cy.get('button').last().click();
    //     cy.url().should('equal', 'http://localhost:4200/add-child');
    // });
});