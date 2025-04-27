describe('Egyszerű keresés tesztelése a főoldalon', () => {

    before(() => {
      cy.visit('/login')
  
      const email = Cypress.env('username')
      const password = Cypress.env('password')
  
      cy.login(email, password)
  
      // Biztosítsuk, hogy bejelentkezés után a főoldalon vagyunk
      cy.url().should('include', '/all-research?topic=all_research')
    })
  
    it('Egyszerű keresés működésének ellenőrzése', () => {
      cy.wait(500)
  
      // "Search" gomb megkeresése és kattintása
      cy.get('.button.hidden-xs')
        .should('be.visible')
        .click({ force: true })
  
      cy.wait(500)
  
      // Search bar megjelenésének ellenőrzése
      cy.get('input')
        .should('be.visible')
        .click()
        .type('pushnoti20250417{enter}') // Entert küldünk a beírás után
  
      // A keresőgombra is kattinthatunk
      // cy.get('.icons > .icon-search-outline').click({ force: true })
  
      // Hosszabb várakozás a lassú keresés miatt
      cy.wait(3000) // 120 másodperc = 2 perc
  
      // Eredménycím ellenőrzése
      cy.get('.first > .post-card-inner > .card > .title')
        .invoke('text')
        .then((text) => {
            expect(text.toLowerCase()).to.include('pushnoti2025041711')
        })
    })
  
  })