/* eslint-disable */

// describe('word-wizard/stage', () => {
//   beforeEach(() => {

//     cy.viewport('iphone-6')

//     cy.intercept('GET', 'https://dev-yr27mck7ia3usnqt.us.auth0.com/u/login?state=*', {
//       statusCode: 200,
//       body: {
//         access_token: 'mocked-access-token',
//         token_type: 'Bearer',
//         expires_in: 3600,
//       },
//     }).as('auth0Login');

//     cy.visit('/welcome');


//   });

//   it('should access the stage page after successful login', () => {
//     cy.get('ion-button').click();
//     cy.wait('@auth0Login');

//     cy.visit('/stage');

//   });

//   it('should display the header title', () => {
//     cy.visit('/stage');
//     cy.get('.ww-header-title').should('contain', 'Stages');
//   });

//   it('should display 20 coins', () => {
//     cy.get('.ww-lesson-coin')
//       .find('.coin')
//       .should('have.length', 20);
//   });

// });

describe('word-wizard/stage', () => {

  it('should load the stage page', () => {
    cy.visit('/stage');
    });

  // it('should access the stage page after successful login', () => {
  //   //cy.get('ion-button').click();
  //   cy.visit('/stage');

  // });

  // it('should display the header title', () => {
  //   cy.get('.ww-header-title').should('contain', 'Stages');
  // });

  // it('should display 20 coins', () => {
  //   cy.get('.ww-lesson-coin')
  //     .find('.coin')
  //     .should('have.length', 20);
  // });

});
