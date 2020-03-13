describe('Approvals', () => {
  before(() => {
    cy.server();
    cy.route('GET', 'http://127.0.0.1:5000/api/v1/approvals',
      'fixture:approvals/approval');
  });

  describe('Managers approval page', () => {
    before(() => {
      cy.authenticateUser();
      cy.visit('/requests/my-approvals');
    });

    it('displays the approvals header', () => {
      cy
        .get('.PageHeader span.title')
        .contains('APPROVALS');
    });

    it('displays the All button', () => {
      cy
        .get('#all-button')
        .contains('All');
    });

    it('displays the Pending Approvals button', () => {
      cy
        .get('#open-button')
        .contains('Pending Approvals');
    });

    it('displays the Past Approvals button', () => {
      cy
        .get('#past-button')
        .contains('Past Approvals');
    });

    it('displays the Items per page text', () => {
      cy
        .get('.cell-items-per-page-text')
        .contains('Items per page');
    });

    it('displays pre-populated value of 10 on select drop down', () => {
      cy
        .get('.dropdown__input')
        .contains('10');
    });

    it('displays a component that shows travel request for the manager\'s approval', () => {
      cy
        .get('.table__row > .pl-sm-100')
        .contains('Ronald Ndirangu');
    });
  });
});
