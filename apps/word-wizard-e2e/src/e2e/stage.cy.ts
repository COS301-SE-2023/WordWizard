/* eslint-disable */

describe('word-wizard', () => {
  beforeEach(() => {

    cy.viewport('iphone-6')

    cy.intercept('GET', 'https://dev-yr27mck7ia3usnqt.us.auth0.com/u/login?state=*', {
      statusCode: 200,
      body: {
        access_token: 'mocked-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
      },
    }).as('auth0Login');

    cy.visit('/welcome');


  });

  it('should access the stage page after successful login', () => {
    cy.get('ion-button').click();
    cy.wait('@auth0Login');

    cy.visit('/stage');

  });
});
