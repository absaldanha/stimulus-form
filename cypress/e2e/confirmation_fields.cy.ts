describe('Confirmation validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/confirmation_fields_form.html');
  });

  it('Prevents form submission when field is not equal to the other field', () => {
    cy.get('#test_source').type('something');
    cy.get('#test_confirmation').type('something different');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_confirmation"]').should('have.text', "Doesn't match");
  });

  it('Submits the form when all field is equal to the other field', () => {
    cy.get('#test_source').type('something');
    cy.get('#test_confirmation').type('something');
    cy.contains('Submit').click();
    cy.contains('Form was submitted');
  });
});
