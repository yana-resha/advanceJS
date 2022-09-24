/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe('Тестируем игру в пары', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('6');
    cy.get('button').click();
  });

  it('Если ввели в инпут число добавились в поле карточки в двойном количестве', () => {
    cy.get('ul li').should('have.length', '12');
  });
  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой', () => {
    cy.get('ul li').first().click();
    cy.get('ul li').first().should('have.not.class', 'card-close-style');
  });
  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой', () => {
    let countOne = 0;
    let countTwo = 1;
    function searchSameCards(countOne, countTwo) {
      cy.get('ul li')
        .eq(countOne)
        .click()
        .then(($card1) => {
          const text = $card1.text();
          cy.get('ul li')
            .eq(countTwo)
            .click()
            .then(($card2) => {
              const text2 = $card2.text();
              if (text === text2) {
                cy.get('li').eq(countOne).should('have.class', 'black');
                cy.get('li').eq(countTwo).should('have.class', 'black');
              } else {
                countOne += 1;
                countTwo += 1;
                searchSameCards(countOne, countTwo);
              }
            });
        });
    }
    searchSameCards(countOne, countTwo);
  });
  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми.', () => {
    let countOne = 0;
    let countTwo = 1;
    function searchNotEqualCards(countOne, countTwo) {
      cy.get('ul li')
        .eq(countOne)
        .click()
        .then(($card1) => {
          const text = $card1.text();
          cy.get('ul li')
            .eq(countTwo)
            .click()
            .then(($card2) => {
              const text2 = $card2.text();
              if (text !== text2) {
                cy.get('li').eq(countOne).should('have.not.class', 'black');
                cy.get('li').eq(countTwo).should('have.not.class', 'black');
              } else {
                countOne += 2;
                countTwo += 2;
                searchNotEqualCards(countOne, countTwo);
              }
            });
        });
    }
    searchNotEqualCards(countOne, countTwo);
  });
});
