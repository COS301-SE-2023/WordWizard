/* eslint-disable */
describe('word-wizard/settings', () => {
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

  it('should load the settings page', () => {
    cy.visit('/settings');
  });

  it('should open the image picker modal when the profile photo is clicked', () => {
    cy.visit('/settings');
    cy.get('.pencil').click();
    cy.get('.overlay').should('be.visible');
  });

  it('should close the image picker modal when the close icon is clicked', () => {
    cy.visit('/settings');
    cy.get('.pencil').click();
    cy.get('.overlay').should('be.visible');

    cy.get('.close-icon').click();
    cy.get('.overlay').should('not.be.visible');
  });

  it('should change the profile image when a new PFP is picked on the modal', () => {
    cy.visit('/settings');

    cy.get('.pencil').click();

    cy.get('.img-item').first().click();

    cy.get('.profile-img img').should('have.attr', 'src').should('not.be.empty');
  });

  it('should fill in input fields and save changes', () => {
    cy.visit('/settings');

    cy.get('input#name').clear().type('Test Name');
    cy.get('input#age').clear().type('10');
    cy.get('input#stage').clear().type('5');

    cy.contains('ww-button', 'Save Changes').click();
  });


});
