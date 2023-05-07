describe('Format validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/format_fields_form.html');
  });

  it('Prevents form submission when fields are not in the given format', () => {
    cy.contains('Submit').click();
    cy.get('[data-testid="test_regex"]').should('have.text', 'Is invalid');
    cy.get('[data-testid="test_email"').should('have.text', 'Is invalid');

    cy.get('#test_regex').type('wrong');
    cy.get('#test_email').type('wrong');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_regex"]').should('have.text', 'Is invalid');
    cy.get('[data-testid="test_email"').should('have.text', 'Is invalid');
  });

  it('Submits the form when all fields are in the correct format', () => {
    cy.get('#test_regex').type('bar-something-something-foo');
    cy.get('#test_email').type('foo.bar@mail.com');
    cy.contains('Submit').click();
    cy.contains('Form was submitted');
  });
});
