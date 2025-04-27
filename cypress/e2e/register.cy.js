describe('Új user létrehozása és keresése a Dashboard Users menüpontban', () => {

  before(() => {
    cy.visit('/login')

    const email = Cypress.env('username')
    const password = Cypress.env('password')

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/all-research?topic=all_research')
  })

  it('Új user létrehozása, majd visszakeresése email alapján', () => {
    cy.wait(500)

    // Profil menü -> Dashboard navigáció
    cy.get('span.hidden-xs > .profile-dropdown-container > .analyst-public-dropdown > #profile-dropodown')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    cy.get('span.hidden-xs > .profile-dropdown-container > .analyst-public-dropdown > .dropdown-menu > :nth-child(5) > a')
      .should('be.visible')
      .click({ force: true })

    cy.url().should('include', '/admin/content/posts')
    cy.wait(1000)

    // System menüpont lenyitása
    cy.get(':nth-child(3) > .nav-section > .fas')
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    // Users oldalra navigálás
    cy.get(':nth-child(3) > .nav-section-list > :nth-child(2) > .nav-link > p')
      .should('be.visible')
      .click({ force: true })

    cy.url().should('include', '/admin/system/users')
    cy.wait(1000)

    // New User gomb megnyomása
    cy.get('.admin-button')
      .should('be.visible')
      .click({ force: true })

    cy.url().should('include', '/admin/system/users/new')
    cy.wait(1000)

    // === Űrlap kitöltése ===

    // Dinamikus egyedi email generálás (három számjegy)
    const randomThreeDigits = Math.floor(Math.random() * 900) + 100;
    const emailAddress = `bence.boda+${randomThreeDigits}@attrecto.com`;

    // First Name
    cy.get(':nth-child(1) > .touched > .form-control-container > .form-control')
      .should('be.visible')
      .type('Bence')

    cy.wait(200)

    // Last Name
    cy.get(':nth-child(2) > .touched > .form-control-container > .form-control')
      .should('be.visible')
      .type('Test')

    cy.wait(200)

    // Email
    cy.get(':nth-child(3) > .touched > .form-control-container > .form-control')
      .should('be.visible')
      .type(emailAddress)

    cy.wait(200)

    // Phone
    cy.get(':nth-child(4) > .touched > .form-control-container > .form-control')
      .should('be.visible')
      .type('+3630123456')

    cy.wait(200)

    // Analyst Code (8 számjegyű random szám)
    const randomCode = Math.floor(10000000 + Math.random() * 90000000).toString();

    cy.get(':nth-child(5) > .touched > .form-control-container > .form-control')
      .should('be.visible')
      .type(randomCode)

    cy.wait(200)

    // Description
    cy.get(':nth-child(7) > .form-group > .form-control-container > .form-control')
      .should('be.visible')
      .type('Ez egy teszt user az automatizált scripthez, teszt 123 123 teszt')

    cy.wait(200)

    // Full Access checkbox bepipálása
    cy.get(':nth-child(8) > .checkbox-form-group > .checkbox-inline > input')
      .should('be.visible')
      .check({ force: true })

    cy.wait(500)

    // Sectors access dropdown kezelése
    //cy.get('#react-select-3--value > .Select-placeholder')
    //  .should('be.visible')
    // .click({ force: true })

    //cy.get('.Select-option', { timeout: 10000 })
    //  .first()
    //  .should('be.visible')
    //  .click({ force: true })

    //cy.wait(500)

    // Roles dropdown kezelése
    cy.get(':nth-child(6) > .react-select-container > .Select > .Select-control > .Select-arrow-zone')
      .should('be.visible')
      .click({ force: true })

    cy.get('.Select-option', { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    // Save gomb megnyomása
    cy.get('.admin-button')
      .should('be.visible')
      .click({ force: true })

    // Fél perc várakozás, hogy biztosan lementse
    cy.wait(30000)

    // === Visszakeresés a Users oldalra és keresés ===

    // Bal oldali Users menüre kattintás
    cy.get('li.active > .nav-link > p')
      .should('be.visible')
      .click({ force: true })

    cy.url().should('include', '/admin/system/users')
    cy.wait(2000)

    // Keresőmező megkeresése és kitöltése a lementett email címmel
    cy.get('.form-control')
      .should('be.visible')
      .click()
      .type(`${emailAddress}{enter}`)

    cy.wait(3000)
  })

})
