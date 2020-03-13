import moment from 'moment';

describe('Requests Page(view request details)', () => {
  let request;
  before(() => {
    cy.authenticateUser();
    cy.visit('/requests');
    cy.server();
    cy.route('POST', 'http://127.0.0.1:5000/api/v1/requests').as(
      'createRequest'
    ); // Used to check when request is POST completed
    // Fill form data
    cy.get('button.action-btn.btn-new-request').as('request-button');
    cy.get('@request-button').click();
    cy.get('input[name=name]')
      .clear()
      .type('Another test user');
    cy.get('button[name=gender]:last').click();
    cy.get('div[name=department]').click();
    cy.get('div[name=department] > ul > li#choice:first').click();
    cy.get('div[name=manager]').click();
    cy.get('div[name=manager] > ul > li#choice:first').click();
    cy.get('input.occupationInput')
      .clear()
      .type('Software developer');
    cy.get('input[name=origin-0]')
      .type('Kigali')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=destination-0]')
      .type('Nairobi')
      .wait(2000)
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
    cy.get('div[name=bed-0]').click();
    cy.get('div[name=bed-0] > ul > li#choice:first')
      .wait(2000)
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

  it(`should open the request details modal when the
  requestId is clicked`, () => {
    cy.server();
    cy.route(`http://127.0.0.1:5000/api/v1/requests/${request.id}`).as(
      'getRequest'
    );
    cy.get('.table__row')
      .eq(0)
      .find('td')
      .eq(0)
      .find('.button-outline')
      .click();
    cy.get('.modal')
      .should('be.visible')
      .contains(`${request.id} Request Details`);
    cy.get('.request-details').should('be.visible');
  });

  it('should display details of the request', () => {
    cy.get('.modal').then(() => {
      cy.get('.lable-text').contains('Manager Stage');
      cy.get('.modal__user-info').contains('Another test user'); // user's name
      cy.get('.modal__user-info > img').should(
        'have.attr',
        'src',
        request.picture
      ); // user's avatar
      cy.get('.user-role').contains('Software developer, Talent & Development');
      cy.get('.request__status--open').contains('Open');
      cy.get('.request-type').contains('Return Trip');
      cy.get('.modal__trip-detail')
        .eq(0)
        .contains('Kigali, Rwanda'); // origin
      cy.get('.modal__trip-detail')
        .eq(1)
        .contains('Nairobi, Kenya'); //destination
      cy.get('.modal__trip-detail')
        .eq(2) // departure date
        .contains(moment(request.trips[0].departureDate).format('DD MMM YYYY'));
      cy.get('.modal__trip-detail')
        .eq(3) // return date
        .contains(moment(request.trips[0].returnDate).format('DD MMM YYYY'));
      cy.get('.modal__add-comment')
        .should('be.visible')
        .contains('Add a comment');
    });
  });

  it('displays the WSISWYG editor', () => {
    cy.get('.editor__editor-form').within(() => {
      cy.get('.quill').should('be.visible');
      cy.get('.editor__btn-wrap > button#post-submit')
        .contains('Post')
        .should('be.disabled');
    });
  });

  it(`closes the request details modal when the
  close button is clicked`, () => {
    cy.get('button.modal-close').click();
    cy.get('.modal').should('not.be.visible');
  });
});
