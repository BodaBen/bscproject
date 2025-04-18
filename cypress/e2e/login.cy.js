describe('Bejelentkező oldal – alapfunkcionalitás', () => {
    it('Az oldal sikeresen betöltődik, az alap elemek láthatók', () => {
      cy.visit('/')
  
      // Oldal elérhetőségének ellenőrzése
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

  describe('Bejelentkezés tesztelése', () => {
    it('Sikeres bejelentkezés érvényes adatokkal', () => {
      const email = Cypress.env('username')
      const pw = Cypress.env('password')
  
      // Bejelentkező oldal betöltése
      cy.visit('/login')
  
      // Email mező kitöltése
      cy.get('input[name="email"]').type(email)
  
      // Jelszó mező kitöltése
      cy.get('input[name="password"]').type(pw)
  
      // Bejelentkezés gomb megnyomása
      cy.get('button[type="submit"]').click()
  
      // Sikeres bejelentkezés ellenőrzése
      cy.url().should('not.include', '/login') // Elhagyja a login oldalt
  
      // (Opcionális) Ellenőrizzük, hogy a dashboard-on vagyunk
      cy.url().should('include', '/dashboard') // vagy amit az oldal használ
  
      // (Opcionális) Ellenőrizhetünk UI elemet is, pl.
      // cy.contains('Üdvözlünk') vagy cy.get('nav').should('exist')
    })
  })