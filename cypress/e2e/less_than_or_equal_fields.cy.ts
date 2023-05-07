describe('Less Than Or Equal validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/less_than_or_equal_fields_form.html');
  });

  it('Prevents form submission when text fields are greater than the given value', () => {
    cy.get('#test_text').type('12');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_text"]').should('have.text', 'Must be less than or equal to 10');
  });

  it('Prevents form submission when number fields are greater than the given value', () => {
    cy.get('#test_number').type('22');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_number"]').should('have.text', 'Must be less than or equal to 10');
  });

  it('Submits the form when fields are less than or equal the given value', () => {
    cy.get('#test_text').type('10');
    cy.get('#test_number').type('0');

    cy.contains('Submit').click();
    cy.contains('Form was submitted');
  });
});
