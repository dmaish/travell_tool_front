describe('Travel checklists page', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/checklists');
  });

  describe('Add travel checklist item', () => {
    before(() => {
      // Click on 'Add item' button
      cy.get('button.action-btn.btn-new-request').as('checklist-button');
      cy.get('@checklist-button').click();
    });

    it('should be displayed in a modal when the Add Item button is clicked', () => {
      cy.get('label').should('be.visible');
      cy.get('label').contains('Item Name');
      cy.get('label').contains('Link to information document');
      cy.get('input').should('be.visible');
      cy.get('input.link-label-field').should('be.visible');
      cy.get('input.link-address-field').should('be.visible');
      cy.get('label.container').should('be.visible');
      cy.get('label.container').contains('Require file attachment');
      cy.get('button#cancel.bg-btn.bg-btn--inactive').should('be.visible');
      cy.get('button#submit.bg-btn.bg-btn--active').should('be.visible');
    });

    it('displays an error when no item name input is provided', () => {
      cy.get('input[name=itemName]')
        .focus()
        .blur();
      cy.get('input[name=itemName] +span')
        .should('have.class', 'error')
        .contains('This field is required');
    });

    it('inputs a travel checklist item', () => {
      cy.get('input[name=itemName]')
        .type('East African Passport')
        .should('have.value', 'East African Passport');
      cy.get('input.link-label-field')
        .type('passport')
        .should('have.value', 'passport');
      cy.get('input.link-address-field')
        .type('www.com')
        .should('have.value', 'www.com');
      cy.get('span.checkmark').click();
    });

    it('adds/saves a checklist item', () => {
      cy.get('button#submit.bg-btn.bg-btn--active')
        .click()
        .url()
        .should('include', '/checklists');
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Check list item created successfully');
      cy.get('div#item-name').contains('East African Passport');
    });
  });

  describe('handle error', () => {
    before(() => {
      // Click on 'Add item' button again to add another item
      cy.get('.toast:contains("Check list item created successfully") button').click();
      cy.get('button.action-btn.btn-new-request').as('checklist-button');
      cy.get('@checklist-button').click({ force: true });
    });

    it('return an error when adding an existing checklist item', () => {
      cy.get('input[name=itemName]')
        .clear()
        .type('East African Passport');
      cy.get('button#submit.bg-btn.bg-btn--active').click();
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Travel checklist items are unique, kindly check your input');
    });
  });
});
