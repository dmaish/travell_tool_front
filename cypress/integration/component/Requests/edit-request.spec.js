import moment from 'moment';

describe('User editing request', () => {
  let request;
  before(() => {
    cy.authenticateUser();
    cy.visit('/requests');
    cy.server();
    cy.route('POST', 'http://127.0.0.1:5000/api/v1/requests').as(
      'createRequest'
    ); // Used to check when request is POST completed

    // Fill form data
    cy.get('button.action-btn.btn-new-request').as('request-button').click();
    cy.get('input[name=name]')
      .clear()
      .type('Mr White');
    cy.get('button[name=gender]:last').click();
    cy.get('div[name=department]').click();
    cy.get('div[name=department] > ul > li#choice:first').wait(1000).click();
    cy.get('div[name=manager]').click().wait(1000);
    cy.get('div[name=manager] > ul > li#choice:first').click();
    cy.get('input.occupationInput')
      .clear()
      .type('Software developer');
    // TODO: Find a way to mock google's location API to avoid long wait times
    cy.get('input[name=origin-0]')
      .type('Kampala')
      .wait(5000)
      .type('{downarrow}{enter}');
    cy.get('input[name=destination-0]')
      .type('Nairobi')
      .wait(5000)
      .type('{downarrow}{enter}');
    cy.get('input[name=departureDate-0]').click();
    cy.get('.react-datepicker__day--today')
      .next()
      .click();
    cy.get('input[name=arrivalDate-0]').click();
    cy.get('.react-datepicker__day--today')
      .next()
      .next()
      .click();
    cy.get('div[name=bed-0]').click().wait(5000).get('div[name=bed-0] > ul > li#choice:first')
      .click();
    // Submit form
    cy.get('button#submit')
      .as('submit')
      .should('not.be.disabled')
      .click();
    cy.wait('@createRequest').then(createdRequest => {
      request = createdRequest.response.body.request;
    });
  });

  it('should display the edit modal when the edit button is clicked', () => {
    cy.authenticateUser();
    cy.visit('/requests');

    cy.get('.request__status--open + .menu__container:first').click();
    cy.get('.table__menu-list').should('be.visible');
    cy.get('#iconBtn').click();

    // modal is displayed
    cy.get('.modal')
      .as('request-modal')
      .should('be.visible');

    // pre-filled fields
    cy.get('input[name=name]').should('have.value', 'Mr White');
    cy.get('.input > .bg-btn--active').contains('Male');
    cy.get('.request_dropdown [for=department] + div > div[name=department] > div.value').contains('Talent & Development');
    cy.get('label[for=role] + div > div.value > input.occupationInput').should('have.value', 'Software developer');
    cy.get('input[name=origin-0]').should('have.value', 'Kampala, Uganda');
    cy.get('input[name=destination-0]').should('have.value', 'Nairobi, Kenya');
    cy.get('input[name=departureDate-0]').should('have.value', moment().add(1, 'days').format('MM/DD/YYYY'));
    cy.get('input[name=arrivalDate-0]').should('have.value', moment().add(2, 'days').format('MM/DD/YYYY'));

    // predefined request type selected
    cy.get('input#return').should('be.checked');
    cy.get('.modal-close').wait(3000).click();
  });

  it('should display errors when fields are cleared and the submit button should be disabled', () => {
    cy.authenticateUser();
    cy.visit('/requests');

    cy.get('.request__status--open + .menu__container:first').click();
    cy.get('.table__menu-list').should('be.visible');
    cy.get('#iconBtn').click();

    // modal is displayed
    cy.get('.modal')
      .as('request-modal')
      .should('be.visible');

    cy.get('input[name=origin-0]').clear();
    cy.get('input[name=destination-0]').clear();
    cy.get('input[name=name]').clear();
    cy.get('label[for=role] + div > div.value > input.occupationInput').clear();
    cy.get('#submit').should('be.disabled');
    cy.get('input[name=origin-0] ~ span.error')
      .should('be.visible')
      .contains('This field is required');
    cy.get('input[name=destination-0] ~ span.error')
      .should('be.visible')
      .contains('This field is required');
    cy.get('input[name=name] ~ span.error')
      .should('be.visible')
      .contains('This field is required');
    cy.get('label[for=role] ~ span')
      .should('be.visible')
      .contains('This field is required');
    cy.get('.modal-close').click();
  });

  it('should allow the user to edit the request and see a success message', () => {
    cy.authenticateUser();
    cy.visit('/requests');

    cy.get('.request__status--open + .menu__container:first').click();
    cy.get('.table__menu-list').should('be.visible');
    cy.get('#iconBtn').click();

    // user edits the request
    cy.get('label[for=oneWay]').click();
    cy.get('input[name=destination-0]').clear();
    cy.get('input[name=origin-0]')
      .clear()
      .type('Lagos')
      .wait(5000)
      .type('{downarrow}{enter}');
    cy.get('input[name=destination-0]')
      .clear().type('Nairobi')
      .wait(5000)
      .type('{downarrow}{enter}');

    // Toast success should be visible
    cy.get('.toast-success:contains("Request updated")')
      .should('be.visible');

    // confirm that the edit shows on the table
    cy.get('td:nth-child(2):first').contains('One-way');
    cy.get('td:nth-child(3):first').contains('Lagos, Nigeria');
  });

  it('should only allow one to edit an open request', () => {
    cy.authenticateUser();
    cy.visit('/requests');
    cy.get('.request__status--rejected + .menu__container:first').click();
    cy.get('#iconBtn').should('not.be.visible');
    cy.get('.table__menu-container.open .table__menu-list .table__menu-list-item:contains("Cancel"):first').click();

    cy.get('.request__status--approved + .menu__container:first').click();
    cy.get('#iconBtn').should('not.be.visible');
    cy.get('.table__menu-container.open .table__menu-list .table__menu-list-item:contains("Cancel"):first').click();

    cy.get('.request__status--verified + .menu__container:first').click();
    cy.get('#iconBtn').should('not.be.visible');
    cy.get('.table__menu-container.open .table__menu-list .table__menu-list-item:contains("Cancel"):first').click();
  });

});


