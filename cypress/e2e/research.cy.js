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

    it('Felhasználói adatok megjelenése a profil lenyíló menüben', () => {
        // Profilkép ikon megkeresése és kattintás
        cy.get('span.hidden-xs > .profile-dropdown-container > .analyst-public-dropdown > #profile-dropodown > .icon-user-outline')
          .click()
    
        // Várakozás
        cy.wait(500)
        // Felhasználónév ellenőrzése
        cy.contains('Admin Admin').should('be.visible')
        // Emailcím ellenőrzése
        cy.contains(Cypress.env('username')).should('be.visible')
      })
  })
  describe('Bejelentkezés utáni UI navigációs ellenőrzés (csak URL)', () => {

    beforeEach(() => {
      cy.visit('/login')
  
      const email = Cypress.env('username')
      const password = Cypress.env('password')
  
      cy.login(email, password)
    })
  
    it('Research oldal URL ellenőrzése', () => {
      cy.contains('Research').click({ force: true })
      cy.url().should('include', '/all-research?topic=all_research')
    })
  
    it('Recommendations menü: megnyitás és Long submenu URL ellenőrzése', () => {
      cy.contains('Recommendations').click({ force: true })
      cy.contains('Long').click()
      cy.url().should('include', '/recommendations/long')
    })
  
    it('Recommendations menü: Short submenu URL ellenőrzése', () => {
      cy.contains('Recommendations').click({ force: true })
      cy.contains('Short').click()
      cy.url().should('include', '/recommendations/short')
    })
  
    it('Sentiment Tracker oldal URL ellenőrzése', () => {
      cy.contains('Sentiment Tracker').click({ force: true })
      cy.url().should('include', '/sentiment-tracker')
    })
  
    it('Model Portfolio oldal URL ellenőrzése', () => {
      cy.contains('Model Portfolio').click({ force: true })
      cy.url().should('include', '/model-portfolio')
    })
  
    it('Short Screen oldal URL ellenőrzése', () => {
      cy.contains('Short Screen').click({ force: true })
      cy.url().should('include', '/short-screen')
    })
  
    it('Factor Panel oldal URL ellenőrzése', () => {
      cy.contains('Factor Panel').click({ force: true })
      cy.url().should('include', '/factor-panel')
    })
  
    it('A-Z Companies oldal URL ellenőrzése', () => {
      cy.contains('A-Z Companies').click({ force: true })
      cy.url().should('include', '/companies')
    })
  
    it('Bookmarks oldal URL ellenőrzése', () => {
      cy.contains('Bookmarks').click({ force: true })
      cy.url().should('include', '/bookmarks')
    })
  
    it('Visszaugrás a Research oldalra', () => {
      cy.contains('Research').should('be.visible').click()
      cy.url().should('include', '/all-research?topic=all_research')
    })
  
  })