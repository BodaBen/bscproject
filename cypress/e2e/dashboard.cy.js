describe('Dashboard oldal teljes ellenőrzése egy it() blokkban', () => {

    before(() => {
      cy.visit('/login')
  
      const email = Cypress.env('username')
      const password = Cypress.env('password')
  
      cy.get('input[name="email"]').type(email)
      cy.get('input[name="password"]').type(password)
      cy.get('button[type="submit"]').click()
  
      cy.url().should('include', '/all-research?topic=all_research')
    })
  
    it('Dashboard elérése és bal oldali menüpontok helyes kezelése', () => {
      cy.wait(500)
  
      // Profilkép ikonra kattintás
      cy.get('span.hidden-xs > .profile-dropdown-container > .analyst-public-dropdown > #profile-dropodown > .icon-user-outline')
        .should('be.visible')
        .click({ force: true })
  
      cy.wait(500)
  
      // Dashboard gombra kattintás
      cy.get('span.hidden-xs > .profile-dropdown-container > .analyst-public-dropdown > .dropdown-menu > :nth-child(5) > a')
        .should('be.visible')
        .click({ force: true })
  
      cy.wait(1000)
  
      // Ellenőrzés: megérkeztünk a Dashboard oldalra
      cy.url().should('include', '/admin/content/posts')
  
      cy.get('.title > span')
        .should('be.visible')
        .and('contain.text', 'Posts')
  
      cy.wait(500)
  
      // === Menüellenőrzések szétválasztva ===
  
      // Analytics menüpont ellenőrzése és kattintása
      cy.get(':nth-child(2) > .nav-section')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include('analytics')
        })
  
      cy.get(':nth-child(2) > .nav-section')
        .click({ force: true })
  
      cy.wait(500)
  
      // System menüpont ellenőrzése és kattintása
      cy.get(':nth-child(3) > .nav-section')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include('system')
        })
  
      cy.get(':nth-child(3) > .nav-section')
        .click({ force: true })
  
      cy.wait(500)
  
      // Content Pages menüpont ellenőrzése (nyitott állapot, nincs kattintás)
      cy.get(':nth-child(4) > .nav-section')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include('content pages')
        })
  
      cy.wait(500)
  
      // Website Structure menüpont ellenőrzése és kattintása
      cy.get(':nth-child(5) > .nav-section')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include('website structure')
        })
  
      cy.get(':nth-child(5) > .nav-section')
        .click({ force: true })
  
      cy.wait(500)
  
      // Metadata menüpont ellenőrzése és kattintása
      cy.get(':nth-child(6) > .nav-section')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include('metadata')
        })
  
      cy.get(':nth-child(6) > .nav-section')
        .click({ force: true })
  
      cy.wait(500)
  
    })
  
  })
  