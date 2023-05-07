describe('Greater Than validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/greater_than_fields_form.html');
  });

  it('Prevents form submission when text fields are less than or equal to the given value', () => {
    cy.get('#test_text').type('8');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_text"]').should('have.text', 'Must be greater than 10');
  });

  it('Prevents form submission when number fields are less than or equal to the given value', () => {
    cy.get('#test_number').type('10');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_number"]').should('have.text', 'Must be greater than 10');
  });

  it('Submits the form when fields are greater than the given value', () => {
    cy.get('#test_text').type('11');
    cy.get('#test_number').type('100');

    cy.contains('Submit').click();
    cy.contains('Form was submitted');
  });
});
