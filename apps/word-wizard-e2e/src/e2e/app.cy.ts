/* eslint-disable */

describe('login', () => {

  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('/');
  });

  // it('should load the welcome page', () => {
  //   cy.visit('/welcome');
  // });

  // it('should successfully log into word-wizard', () => {
  //   cy.login()
  //     .then((resp) => {
  //       return resp.body;
  //     })
  //     .then((body) => {
  //       const {access_token, expires_in, id_token} = body;
  //       const auth0State = {
  //         nonce: '',
  //         state: 'some-random-state'
  //       };
  //       const callbackUrl = `/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
  //       cy.visit(callbackUrl, {

  //         onBeforeLoad(win) {
  //           win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
  //         }
  //       });


  //     })
  // });

  // it('should go to stage page after successful login', () => {
  //   cy.visit('/welcome');
  // });

  it('should complete login with Auth0', () => {
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


    cy.url().should('equal', 'http://localhost:4200/welcome');
  });


});
