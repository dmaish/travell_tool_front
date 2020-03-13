describe('Requests', () => {
  before(() => {
    cy.server();
    cy.route('GET', 'http://127.0.0.1:5000/api/v1/requests',
      'fixture:requests/no-request');
  });

  describe('New User\'s request page', () => {
    before(() => {
      cy.authenticateUser();
      cy.visit('/requests');
    });

    it('displays the requests header', () => {
      cy
        .get('.PageHeader span.title')
        .contains('REQUESTS');
    });

    it('displays the `New request` button', () => {
      cy
        .get('button.action-btn.btn-new-request')
        .contains('New Request');
    });

    it('displays text when there are no requests', () => {
      cy
        .get('div.table__container')
        .find('div.table__requests--empty')
        .contains('You have no requests at the moment');
    });
  });

});

