describe('Bejelentkezés utáni ellenőrzések', () => {

    beforeEach(() => {
      // Lépjünk a login oldalra és jelentkezzünk be helyes adatokkal
      cy.visit('/login')
  
      const email = Cypress.env('username')
      const password = Cypress.env('password')
  
      cy.login(email, password)
    })
  
    it('URL ellenőrzése bejelentkezés után', () => {
      // Ellenőrizzük, hogy a helyes oldalra navigáltunk
      cy.url().should('include', '/all-research?topic=all_research')
    })
  
  })