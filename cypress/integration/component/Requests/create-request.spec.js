describe('Requests page(create new request)', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/requests');
  });

  describe('Request Form', () => {
    before(() => {
      // Click on 'New Request' button
      cy.get('button.action-btn.btn-new-request').as('request-button');
      cy.get('@request-button').click();
    });

    it(`should be displayed in a modal when the
        	'New Request' button is clicked`, () => {
      cy.get('.modal')
        .as('request-modal')
        .should('be.visible');
      cy.get('@request-modal')
        .find('form.new-request')
        .as('request-form')
        .should('be.visible');
      cy.get('@request-modal').contains('New Travel Request');
      cy.get('@request-form').contains('Personal Details');
      cy.get('@request-form').contains('Travel Details');
    });

    it(`checks the return radio button as the default trip type
			 	when the form launches`, () => {
      cy.get('input[type=radio]#return').should('be.checked');
    });

    it(`shows validation error for empty fields after
          user focuses and leaves the field without filling it`, () => {
      cy.get('input[name=origin-0]')
        .focus()
        .blur();
      cy.get('input[name=origin-0] + span').as('error-span');
      cy.get('@error-span').should('have.class', 'error');
      cy.get('@error-span').contains('This field is required');
    });

    it('clears fields when the Cancel button is clicked', () => {
      const [today] = new Date()
        .toLocaleString('en-US')
        .toString()
        .split(',');
      cy.get('input[name=departureDate-0]')
        .as('departure-date')
        .click();
      cy.get('.react-datepicker__day--today').click();
      cy.get('@departure-date').should('have.value', today);
      cy.get('button#cancel').click();
      cy.get('@departure-date').should('have.value', '');
    });

    it(`disables the return date field when departure
           date is not yet selected`, () => {
      cy.get('input[name=arrivalDate-0]')
        .as('arrival-date')
        .should('be.disabled');
      cy.get('input[name=departureDate-0]')
        .as('departure-date')
        .click();
      cy.get('.react-datepicker__day--today').click();
      cy.get('@arrival-date').should('not.be.disabled');
    });

    it(`disables the submission button when some of
        the fields are missing`, () => {
      cy.get('button#submit').should('be.disabled');
    });
  });

  describe('Create return request', () => {
    it('creates a return request', () => {
      cy.server();
      cy.route('POST', 'http://127.0.0.1:5000/api/v1/requests').as(
        'createRequest'
      ); // Used to check when request is POST completed

      // Fill form data
      cy.get('input[name=name]')
        .clear()
        .type('Test User');
      cy.get('button[name=gender]:first').click();
      cy.get('div[name=department]').click();
      cy.get('div[name=department] > ul > li#choice:first').click();
      cy.get('div[name=manager]').click();
      cy.get('div[name=manager] > ul > li#choice:first').click();
      cy.get('input.occupationInput')
        .clear()
        .type('Account associate');
      cy.get('input[name=origin-0]')
        .type('Nairobi')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=destination-0]')
        .type('Lagos')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=arrivalDate-0]').click();
      cy.get('.react-datepicker__day--today + div:first').click();
      cy.get('div[name=bed-0]').click();
      cy.get('div[name=bed-0] > ul > li#choice:first')
        .wait(2000)
        .click();
      // Submit form
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();
      cy.wait('@createRequest');

      //check for success toast message
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Request created');

      // check for created request in request table
      cy.get('.table__row')
        .eq(0)
        .find('td')
        .as('request-data');
      cy.get('@request-data')
        .eq(1)
        .should('contain', 'Return'); // trip type column
      cy.get('@request-data')
        .eq(2)
        .should('contain', 'Nairobi, Kenya'); // origin column
      cy.get('@request-data')
        .eq(3)
        .should('contain', '2 days'); // trip duration column
      cy.get('@request-data')
        .eq(5)
        .should('contain', '0% complete'); // travel completion column
      cy.get('@request-data')
        .eq(6)
        .should('contain', 'Open'); // status column
    });
  });

  describe('Create one-way request', () => {
    before(() => {
      cy.get('button.action-btn.btn-new-request').as('request-button');
      cy.get('@request-button').click({ force: true });
      cy.get('input[type=radio]#oneWay').check({ force: true }); //check one-way radio button
    });

    it('hides the return date and room input fields', () => {
      cy.get('input[name=arrivalDate-0]').should('not.be.visible');
      cy.get('input[name=bed-0]').should('not.be.visible');
    });

    it('creates a one-way request', () => {
      cy.server();
      cy.route('POST', 'http://127.0.0.1:5000/api/v1/requests').as(
        'createRequest'
      );

      cy.get('input[name=name]')
        .clear()
        .type('Test User');
      cy.get('button[name=gender]')
        .eq(1)
        .click();
      cy.get('div[name=department]').click();
      cy.get('div[name=department] > ul > li#choice')
        .eq(0)
        .click();
      cy.get('div[name=manager]').click();
      cy.get('div[name=manager] > ul > li#choice')
        .eq(0)
        .click();
      cy.get('input.occupationInput')
        .clear()
        .type('Software developer');
      cy.get('input[name=origin-0]')
        .type('Kampala')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=destination-0]')
        .type('New York')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=departureDate-0]').click();
      cy.get('.react-datepicker__day--today')
        .next()
        .click();

      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();
      cy.wait('@createRequest');

      cy.get('.toast-message')
        .should('be.visible')
        .contains('Request created');

      cy.get('.table__row')
        .eq(0)
        .find('td')
        .as('request-data');
      cy.get('@request-data')
        .eq(1)
        .should('contain', 'One-way'); // trip type column
      cy.get('@request-data')
        .eq(2)
        .should('contain', 'Kampala, Uganda'); // origin column
      cy.get('@request-data')
        .eq(3)
        .should('contain', 'Not applicable'); // trip duration column
      cy.get('@request-data')
        .eq(5)
        .should('contain', '0% complete'); // travel completion column
      cy.get('@request-data')
        .eq(6)
        .should('contain', 'Open'); // status column
    });
  });

  describe('Create multi-trip request', () => {
    before(() => {
      cy.get('button.action-btn.btn-new-request').as('request-button');
      cy.get('@request-button').click({ force: true });
      //check multi radio button
      cy.get('input[type=radio]#multi').check({ force: true });
    });

    it('displays two input groups by default and a button to add new input group', () => {
      cy.get('.travel-input-area')
        .as('travel-div')
        .its('length')
        .should('eq', 2);
      cy.get('button.another-trip')
        .should('be.visible')
        .contains('Add another trip');
    });

    it('adds a new input group when the add new trip button is clicked', () => {
      cy.get('button.another-trip').click();
      cy.get('.travel-input-area')
        .its('length')
        .should('eq', 3);
    });

    it('removes an input group when its delete icon is clicked', () => {
      cy.get('.input-group#trip2 > button.delete-icon').click();
      cy.get('.travel-input-area')
        .its('length')
        .should('eq', 2);
    });

    it('creates a multi-trip request', () => {
      let leavingDate = '';
      cy.server();
      cy.route('POST', 'http://127.0.0.1:5000/api/v1/requests').as(
        'createRequest'
      );

      cy.get('.hide-details').click();
      cy.get('input[name=name]')
        .clear()
        .type('Test User');
      cy.get('button[name=gender]:first').click();
      cy.get('div[name=department]').click();
      cy.get('div[name=department] > ul > li#choice:first').click();
      cy.get('div[name=manager]').click();
      cy.get('div[name=manager] > ul > li#choice:first').click();
      cy.get('input.occupationInput')
        .clear()
        .type('Account associate');
      cy.get('input[name=origin-0]')
        .type('Nairobi')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=destination-0]')
        .type('Lagos')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=departureDate-0]').click();
      cy.get('.react-datepicker__day--today').click();
      cy.get('input[name=arrivalDate-0]')
        .as('leaving-date')
        .click();
      cy.get('.react-datepicker__day--today + div:first')
        .as('tomorrow')
        .click();
      cy.get('div[name=bed-0]').click();

      cy.get('div[name=bed-0] > ul > li#choice:first')
        .wait(2000)
        .click();

      // check for auto-filling of next origin using previous destination value
      cy.get('input[name=origin-1]').should('have.value', 'Lagos, Nigeria');
      cy.get('input[name=destination-1]')
        .type('Kampala')
        .wait(1000)
        .type('{downarrow}{enter}');
      // check for auto-filling of next departure date using the previous leaving date
      cy.get('input[name=arrivalDate-0]').then(el => {
        leavingDate = Cypress.$(el).val();
        cy.get('input[name=departureDate-1]').should('have.value', leavingDate);
      });
      cy.get('input[name=arrivalDate-1]').click();
      cy.get('@tomorrow')
        .next()
        .click();

      cy.get('div[name=bed-1]').click();
      cy.get('div[name=bed-1] > ul > li#choice:first')
        .wait(2000)
        .click();

      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();
      cy.wait('@createRequest');

      cy.get('.toast-message')
        .should('be.visible')
        .contains('Request created');

      cy.get('.table__row')
        .eq(0)
        .find('td')
        .as('request-data');
      cy.get('@request-data')
        .eq(1)
        .should('contain', 'Multi');
      cy.get('@request-data')
        .eq(2)
        .should('contain', 'Nairobi, Kenya');
      cy.get('@request-data')
        .eq(3)
        .should('contain', '3 days');
      cy.get('@request-data')
        .eq(5)
        .should('contain', '0% complete');
      cy.get('@request-data')
        .eq(6)
        .should('contain', 'Open');
    });
  });
});
