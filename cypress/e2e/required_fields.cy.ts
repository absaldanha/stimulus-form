describe('Required validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/required_fields_form.html');
  });

  it('Prevents form submission when fields are blank', () => {
    cy.contains('Submit').click();

    cy.get('[data-testid="first_name_error"]').should('have.text', "Can't be blank");
    cy.get('[data-testid="last_name_error"]').should('have.text', "Can't be blank");

    cy.get('#first_name').type('Joe');

    cy.contains('Submit').click();

    cy.get('[data-testid="first_name_error"]').should('have.text', '');
    cy.get('[data-testid="last_name_error"]').should('have.text', "Can't be blank");
  });

  it('Submits the form when all fields are filled', () => {
    cy.get('#first_name').type('Joe');
    cy.get('#last_name').type('Doe');

    cy.contains('Submit').click();
    cy.contains('Form was submitted');
  });
});
