describe('Bejelentkező oldal – alapfunkcionalitás', () => {
    it('Az oldal sikeresen betöltődik, az alap elemek láthatók', () => {
      cy.visit('https://analyst.attrecto-dev.com/app/login')
  
      // Ellenőrizd, hogy az oldal betöltődött
      cy.url().should('include', '/login')
  
      // Email mező látható
      cy.get('input[name="email"]').should('be.visible')
  
      // Jelszó mező látható
      cy.get('input[name="password"]').should('be.visible')
  
      // Bejelentkezés gomb látható
      cy.get('button[type="submit"]').should('be.visible')
  
      // Elfelejtett jelszó link megléte
      cy.contains(/forgot password/i).should('be.visible')
    })
  })