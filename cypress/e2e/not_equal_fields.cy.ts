describe('Not Equal validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/not_equal_fields_form.html');
  });

  it('Prevents form submission when fields are equal to the given value', () => {
    cy.get('#test').type('test');
    cy.contains('Submit').click();
    cy.get('[data-testid="test"]').should('have.text', 'Must be other than test');
  });

  it('Submits the form when fields are not equal to the given value', () => {
    cy.get('#test').type('something different');
    cy.contains('Submit').click();
    cy.contains('Form was submitted');
  });
});
