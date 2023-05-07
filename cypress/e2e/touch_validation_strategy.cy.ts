describe('Touch Validation Strategy', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/touch_validation_strategy_form.html');
  });

  it('Validates field on first blur and on input afterwards', () => {
    cy.get('#first_name').focus().blur();
    cy.get('[data-testid="first_name_error"]').should('have.text', "Can't be blank");
    cy.get('#first_name').type('John');
    cy.get('[data-testid="first_name_error"]').should('be.empty', "Doesn't match");
  });

  it('Validates field on input after form submission', () => {
    cy.contains('Submit').click();
    cy.get('[data-testid="first_name_error"]').should('have.text', "Can't be blank");
    cy.get('#first_name').type('John');
    cy.get('[data-testid="first_name_error"]').should('be.empty', "Doesn't match");
  });

  it('Submits form when all fields are valid', () => {
    cy.get('#first_name').type('John');
    cy.contains('Submit').click();
    cy.contains('Form was submitted');
  });
});
