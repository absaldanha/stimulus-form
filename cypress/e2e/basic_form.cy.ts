describe('Basic Form', () => {
  beforeEach(() => {
    cy.visit('fixtures/basic_form.html');
  });

  it('Prevents form submit when all fields are invalid', () => {
    cy.contains('Register').click();

    cy.get('[data-testid="first_name_error"]').should('have.text', "can't be blank");
    cy.get('[data-testid="last_name_error"]').should('have.text', "can't be blank");
  });
});
