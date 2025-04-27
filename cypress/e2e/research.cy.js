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

  describe('Bejelentkezés utáni UI navigációs ellenőrzés', () => {

    before(() => {
      cy.visit('/login')
  
      const email = Cypress.env('username')
      const password = Cypress.env('password')
  
      cy.login(email, password)
    })
    it('Navigációk ellenőrzése bejelentkezés után (bal menü)', () => {
        cy.wait(500)
        cy.contains('Research')
        cy.url().should('include', '/all-research?topic=all_research')
    
        //cy.wait(500)
        //cy.contains('Recommendations').should('be.visible')
    
        cy.wait(500)
        cy.contains('Sentiment Tracker').click({ force: true })
        cy.url().should('include', '/sentiment-tracker')
    
        cy.wait(500)
        cy.contains('Model Portfolio').click({ force: true })
        cy.url().should('include', '/model-portfolio')
    
        cy.wait(500)
        cy.contains('Short Screen').click({ force: true })
        cy.url().should('include', '/short-screen')
    
        cy.wait(500)
        cy.contains('Factor Panel').click({ force: true })
        cy.url().should('include', '/factor-panel')
    
        cy.wait(500)
        cy.contains('A-Z Companies').click({ force: true })
        cy.url().should('include', '/companies')
    
        cy.wait(500)
        cy.contains('Bookmarks').click({ force: true })
        cy.url().should('include', '/bookmarks')
    
      })
    })

    describe('Kezdőoldali elemek ellenőrzése', () => {

        beforeEach(() => {
          cy.visit('/login')
      
          const email = Cypress.env('username')
          const password = Cypress.env('password')
      
          cy.login(email, password)
        })
      
        it('Kezdőoldali elemek megjelenésének ellenőrzése', () => {
          cy.wait(500)
      
          // "Contact Your Account Manager" gomb megjelenése
          cy.get('div.hidden-xs > .button')
            .should('be.visible')
            .and('contain.text', 'Contact Your Account Manager')
      
          cy.wait(500)
      
          // "Search" gomb megjelenése
          cy.get('.button.hidden-xs')
            .should('be.visible')
            .and('contain.text', 'Search')
        })
      
        it('Fejléc háttérszínének ellenőrzése', () => {
          cy.wait(500)
      
          cy.get('.analyst-app-header > .container-fluid') // header kiválasztása
            .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        })
      
        it('Oldal háttérszínének ellenőrzése', () => {
          cy.wait(500)
      
          cy.get('body')
            .should('have.css', 'background-color', 'rgb(230, 230, 230)')
        })
      
      })
      
        