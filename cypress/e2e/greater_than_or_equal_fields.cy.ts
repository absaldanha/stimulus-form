describe('Greater Than Or Equal validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/greater_than_or_equal_fields_form.html');
  });

  it('Prevents form submission when text fields are less than the given value', () => {
    cy.get('#test_text').type('8');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_text"]').should('have.text', 'Must be greater than or equal to 10');
  });

  it('Prevents form submission when number fields are less than the given value', () => {
    cy.get('#test_number').type('6');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_number"]').should('have.text', 'Must be greater than or equal to 10');
  });

  it('Submits the form when fields are greater than or equal the given value', () => {
    cy.get('#test_text').type('10');
    cy.get('#test_number').type('12');

    cy.contains('Submit').click();
    cy.contains('Form was submitted');
  });
});
