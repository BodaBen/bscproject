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
      //cy.url().should('include', '/dashboard') // vagy amit az oldal használ - hiba példa lehet
  
      // (Opcionális) Ellenőrizhetünk UI elemet is, pl.
      // cy.contains('Üdvözlünk') vagy cy.get('nav').should('exist')
    })
    it('Sikeres bejelentkezés után sikeres kilépés', () => {
      const email = Cypress.env('username')
      const pw = Cypress.env('password')
  
      // Bejelentkezés
      cy.visit('/login')
      cy.get('input[name="email"]').type(email)
      cy.get('input[name="password"]').type(pw)
      cy.get('button[type="submit"]').click()
  
      cy.url().should('not.include', '/login')
  
      // (Várakozás az oldal betöltéséhez)
      cy.wait(500)
  
      //Legördülő menü megnyitása, ahol a kijelentkezés gomb van
      cy.get('span.hidden-xs > .profile-dropdown-container > .analyst-public-dropdown > #profile-dropodown').click()
      //Kijelentkezés gomb megnyomása
      cy.get('span.hidden-xs > .profile-dropdown-container > .analyst-public-dropdown > .dropdown-menu > :nth-child(7) > a > .icon-logout-outline').click()
      //Ellenőrizzük, hogy visszakerültünk a login oldalra
      cy.url().should('include', '/login')
    })
  })