/* eslint-disable */

describe('word-wizard/library', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/');

    cy.get('ion-button').click();
    cy.get('input#username').type(Cypress.env('auth_username'));
    cy.get('input#password').type(Cypress.env('auth_password'), {log: false});
    cy.contains('button', 'Continue').click({force: true});
    cy.url().should('equal', 'http://localhost:4200/welcome');

  });

  it('should load the library page', () => {
    cy.visit('/library');
  });

  // it('should display the Vocabulary List when "Vocabulary" segment is selected', () => {
  //   cy.visit('/library');
  //   cy.get('ion-segment-button[value="vocab"]').should('have.attr', 'checked');
  //   cy.get('.vocab-list').should('be.visible');
  // });

  // it('should display the Practice List when "Practice" segment is selected', () => {
  //   cy.visit('/library');
  //   cy.get('ion-segment-button[value="practice"]').click();
  //   cy.get('.practice-list').should('be.visible');
  // });

  // it('should display the Practice List when there is practice data', () => {
  //   cy.intercept('GET', '/api/practice', { words: [{ word: 'Spell1' }, { word: 'Spell2' }] }).as('getPractice');
  //   cy.visit('/library');
  //   cy.get('ion-segment-button[value="practice"]').click();
  //   cy.get('.practice-list').should('be.visible');
  //   cy.wait('@getPractice');
  // });

  // it('should display the Vocabulary List when there is vocabulary data', () => {
  //   cy.intercept('GET', '/api/vocab', { words: [{ word: 'Spell1' }, { word: 'Spell2' }] }).as('getVocab');
  //   cy.visit('/library');
  //   cy.get('ion-segment-button[value="vocab"]').should('have.attr', 'checked');
  //   cy.get('.vocab-list').should('be.visible');
  //   cy.contains('h3', 'No spells yet :O').should('not.be.visible');
  //   cy.wait('@getVocab');
  // });


});
